import { Component, OnInit, Input, trigger, state, style,
         transition,  animate } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Bill } from '../models/bill';
import { SplitType } from '../models/split-type';
import { Friend } from '../../friends/models/friend';
import { Debtor } from '../models/debtor';
import { FriendDebtor } from '../models/friend-debtor';

import { BillService } from '../services/bill.service';
import { GroupService } from '../../groups/services/group.service';
import { DialogService } from '../../../shared-app/services/dialog.service';
import { HelpersService } from '../../../shared-app/services/helpers.service';

import { SplitTypePipe } from '../pipes/split-type.pipe';
import { PaidByPipe } from '../../../shared-app/pipes/paid-by.pipe';

@Component({
    templateUrl: './app/secure-app/bills/components/new-bill.component.html',
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
    model = new Bill(0, '', null, 0, 0, 0, []);
    splitTypes: SplitType[] = [SplitType.Equal, SplitType.ExactAmounts, SplitType.Percentage];
    friends: Friend[] = [];
    friendDebtors: FriendDebtor[] = [];
    showSplitOptions = false;
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

        this.groupService.getGroup(this.model.groupId)
            .then(group => {
                this.friends = group.friends;
                this.friendDebtors = this.friends.map(f => new FriendDebtor(f.userId, f.name, true, 0));
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
        if (this.total != this.model.amount && this.left != 0) {
            this.dialogService.alert("The following errors occurred:\nThe total of everyone's owed shares is different than the total cost.");
            return;
        }

        this.submitted = true;

        this.model.paidBy = +this.model.paidBy;
        this.model.splitType = +this.model.splitType;

        switch(this.model.splitType) {
            case SplitType.Equal:
            case SplitType.ExactAmounts:
                this.friendDebtors.forEach(friend => {
                    this.model.debtors.push(new Debtor(friend.userId, friend.amount));
                });
                break;
            case SplitType.Percentage:
                this.friendDebtors.forEach(friend => {
                    this.model.debtors.push(new Debtor(friend.userId, this.model.amount * friend.amount / 100));
                });
                break;
        }

        this.billService.create(this.model)
            .then(group => {
                this.router.navigate(['/groups', this.model.groupId]);
            });
    }

    // in unequal splitting user enters amounts manually, so we need to calculate and display tips to him
    calculateTotal(): void {
        if (this.model.splitType === SplitType.Equal) {
            var res = this.helpersService.divideNumbersEvenly(this.model.amount, this.friendDebtors.filter(x => x.isActive).length, 2);
            this.friendDebtors.forEach(f => {
                if (f.isActive) {
                    f.amount = res.shift();
                } else {
                    f.amount = 0;
                }
            })
        }

        this.total = this.friendDebtors.reduce(function (sum, friendDebtor) {
            return sum + friendDebtor.amount; 
        }, 0);
        this.left = this.model.amount - this.total;
    }

    changeSplitType(newValue): void {
        this.model.splitType = newValue;
        if (this.model.splitType !== SplitType.Equal) {
            this.showSplitOptions = true;
        }
    }
}