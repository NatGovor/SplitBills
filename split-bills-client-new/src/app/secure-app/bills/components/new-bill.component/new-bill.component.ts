import { animate, Component, OnInit, style,
         transition,  trigger } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Friend } from '../../../../common/models/friend';
import { Bill } from '../../../../common/models/bill';
import { Debtor } from '../../../../common/models/debtor';
import { FriendDebtor } from '../../models/friend-debtor';
import { SplitType } from '../../../../common/enums/split-type';

import { DialogService } from '../../../../common/services/dialog.service';
import { HelpersService } from '../../../../common/services/helpers.service';
import { GroupService } from '../../../groups/services/group.service';
import { BillService } from '../../services/bill.service';

@Component({
    templateUrl: './new-bill.component.html',
    styleUrls: ['./new-bill.component.css'],
    animations: [
        trigger('animateSplitOptions', [
            transition(':enter', [
                style({transform: 'translateX(-100%)', opacity: 0}),
                animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
            ]),
            transition(':leave', [
                style({transform: 'translateX(0)', opacity: 1}),
                animate('500ms', style({transform: 'translateX(-100%)', opacity: 0}))
            ])
        ])
    ]
})
export class NewBillComponent implements OnInit {
    submitted = false;
    model = new Bill(0, '', null, 0, 0, SplitType.Equal, []);
    splitTypes: SplitType[] = [SplitType.Equal, SplitType.ExactAmounts, SplitType.Percentage];
    friends: Friend[] = [];
    friendDebtors: FriendDebtor[] = [];
    showSplitOptions = false;
    enumSplitType = SplitType;
    // values for unequal splitting
    total = 0;
    left = 0;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private billService: BillService,
        private groupService: GroupService,
        private dialogService: DialogService,
        private helpersService: HelpersService
    ) {}

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.model.groupId = +params['groupId'];
        });

        this.groupService.get(this.model.groupId)
            .then((group) => {
                this.friends = group.friends;
                this.friendDebtors = this.friends.map((f) => new FriendDebtor(f.userId, f.name, true, 0));
            });
    }

    canDeactivate(): Promise<boolean> | boolean {
        if (this.submitted) {
            return true;
        }

        return this.dialogService.confirm('Discard creating new bill?')
    }

    goBack(): void {
        this.router.navigate(['../../', this.model.groupId], { relativeTo: this.route });
    }

    onSubmit(): void {
        // validation
        if (this.total !== this.model.amount && this.left !== 0) {
            this.dialogService.alert(
                'The following errors occurred:\nThe total of everyone\'s owed shares is different than the total cost.');
            return;
        }

        this.submitted = true;

        this.model.paidBy = +this.model.paidBy;
        this.model.splitType = +this.model.splitType;

        switch (this.model.splitType) {
            case SplitType.Equal:
            case SplitType.ExactAmounts:
                this.friendDebtors.forEach((friend) => {
                    this.model.debtors.push(new Debtor(friend.userId, friend.amount));
                });
                break;
            case SplitType.Percentage:
                this.friendDebtors.forEach((friend) => {
                    this.model.debtors.push(new Debtor(friend.userId, this.model.amount * friend.amount / 100));
                });
                break;
        }

        this.billService.create(this.model)
            .then((group) => {
                this.router.navigate(['/groups', this.model.groupId]);
            });
    }

    // in unequal splitting user enters amounts manually, so we need to calculate and display tips to him
    calculateTotal(): void {
        if (this.model.splitType === SplitType.Equal) {
            const res = this.helpersService.divideNumbersEvenly(
                this.model.amount, this.friendDebtors.filter((x) => x.isActive).length, 2);
            this.friendDebtors.forEach((f) => {
                if (f.isActive) {
                    f.amount = res.shift();
                } else {
                    f.amount = 0;
                }
            });
        }

        this.total = this.friendDebtors.reduce(function (sum, friendDebtor) {
            return sum + friendDebtor.amount;
        }, 0);
        this.left = this.model.amount - this.total;
    }

    changeSplitType(newValue): void {
        this.model.splitType = +newValue;
        if (this.model.splitType !== SplitType.Equal) {
            this.showSplitOptions = true;
        }
    }
}
