import { Component, OnInit, Input, trigger, state, style,
         transition,  animate } from '@angular/core';
import { Router, ActivatedRoute, 
         Params }            from '@angular/router';

import { Bill }         from './bill';
import { SplitType }    from './split-type';
import { Friend }       from '../friends/friend';
import { Debtor }       from './debtor';
import { FriendDebtor } from './friend-debtor';

import { BillService }   from './bill.service';
import { GroupService }  from '../groups/group.service';
import { DialogService } from '../../shared-app/services/dialog.service';
import { HelpersService } from '../../shared-app/services/helpers.service';

import { SplitTypePipe } from './pipes/split-type.pipe';
import { PaidByPipe } from '../../shared-app/pipes/paid-by.pipe';

@Component({
    template: `
        <div class="col-sm-4">
            <h4>New Bill</h4>
            <form (ngSubmit)="onSubmit()" #groupForm="ngForm">
                <div class="form-group">
                    <label>Description</label>
                    <input type="text" class="form-control" id="description"
                        required
                        [(ngModel)]="model.description" name="description">
                </div>
                <div class="form-group">
                    <label>Amount ($)</label>
                    <input type="number" class="form-control" id="amount"
                        required
                        [ngModel]="model.amount" (ngModelChange)="model.amount=$event; calculateTotal();" name="amount">
                </div>
                <div class="form-group">
                    <label>Paid By</label>
                    <select class="form-control" id="paidBy" 
                            required
                            [(ngModel)]="model.paidBy" name="paidBy">
                        <option *ngFor="let f of friends" [value]="f.userId">{{f.userId | paidByName:friends}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Split type</label>
                    <select class="form-control" id="splitType" 
                            required
                            [ngModel]="model.splitType" (ngModelChange)="changeSplitType($event)" name="splitType">
                        <option *ngFor="let type of splitTypes" [value]="type">{{type | splitTypeName }}</option>
                    </select>
                </div>

                <div class="form-group">
                    <div (click)="showSplitOptions = !showSplitOptions;" class="btn btn-default">
                        Extended split options <span *ngIf="!showSplitOptions" class="glyphicon glyphicon-menu-down"></span>
                        <span *ngIf="showSplitOptions" class="glyphicon glyphicon-menu-up"></span>
                    </div>

                    <div *ngIf="showSplitOptions" [@animateSplitOptions]="showSplitOptions">
                        <div *ngIf="model.splitType == 0">
                            <div>Split equally</div>
                            <div *ngFor="let f of friendDebtors" class="form-group">
                                <input type="checkbox" [ngModel]="f.isActive" (ngModelChange)="f.isActive=$event; calculateTotal();" name="checkbox_{{f.name}}_{{f.userId}}">
                                <label>{{f.name}}</label>
                                <span>{{ f.amount | currency:'USD':true:'1.2-2' }}</span>
                            </div>
                        </div>
                        <div *ngIf="model.splitType != 0">
                            <div>Split by exact amounts</div>
                            <div *ngFor="let f of friendDebtors" class="form-group row">
                                <div class="col-xs-8"><label>{{f.name}}</label></div>
                                <div *ngIf="model.splitType == 1" class="input-group col-xs-4">
                                    <span class="input-group-addon">$</span>
                                    <input type="number" class="form-control" name="unequal_{{f.name}}_{{f.userId}}" [ngModel]="f.amount" (ngModelChange)="f.amount=$event; calculateTotal();">
                                </div>
                                <div *ngIf="model.splitType == 2" class="input-group col-xs-4">
                                    <input type="number" class="form-control" name="unequal_{{f.name}}_{{f.userId}}" [ngModel]="f.amount" (ngModelChange)="f.amount=$event; calculateTotal();">
                                    <span class="input-group-addon">%</span>
                                </div>
                            </div>
                        </div>
                        <div *ngIf="model.splitType != 0" class="row">
                            <div class="col-xs-8 text-uppercase"><b>Total </b></div>
                            <div class="col-xs-4 text-right" *ngIf="model.splitType == 1">
                                <div><b>{{ total | currency:'USD':true }}</b></div>
                                <div>{{ left | currency:'USD':true }} left</div>
                            </div>
                            <div class="col-xs-4 text-right" *ngIf="model.splitType == 2">
                                <div><b>{{ total }}%</b></div>
                                <div>{{ left }}% left</div>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="submit" class="btn btn-default" [disabled]="!groupForm.form.valid">Submit</button>
                <button (click)="goBack()" type="button" class="btn btn-default">Back</button>
            </form>
        </div>
    `,
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