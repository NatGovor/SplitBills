import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, 
         Params }            from '@angular/router';

import { Bill }      from './bill';
import { SplitType } from './split-type';
import { Friend }    from '../friends/friend';
import { Debtor }    from './debtor';
import { FriendDebtor } from './friend-debtor';

import { BillService }  from './bill.service';
import { GroupService } from '../groups/group.service';

import { SplitTypePipe } from './pipes/split-type.pipe';
import { PaidByPipe }    from './pipes/paid-by.pipe';

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
                        [(ngModel)]="model.amount" name="amount">
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
                            [(ngModel)]="model.splitType" name="splitType">
                        <option *ngFor="let type of splitTypes" [value]="type">{{type | splitTypeName }}</option>
                    </select>
                </div>
                <div *ngIf="model.splitType == 0">
                    <div *ngFor="let f of friendDebtors" class="form-group">
                        <input type="checkbox" [(ngModel)]="f.isActive" name="checkbox_{{f.name}}_{{f.userId}}">
                        <label>{{f.name}}</label>
                        <span>{{ calculateDebtorAmount(f) }}</span>
                    </div>
                </div>
                <div *ngIf="model.splitType == 1">
                    <div *ngFor="let f of friendDebtors" class="form-group">
                        <label>{{f.name}}</label>
                        <div class="input-group">
                            <span class="input-group-addon">$</span>
                            <input type="number" class="form-control" name="unequal_{{f.name}}_{{f.userId}}" [(ngModel)]="f.amount">
                        </div>
                    </div>
                </div>
                <div *ngIf="model.splitType == 2">
                    <div *ngFor="let f of friendDebtors" class="form-group">
                        <label>{{f.name}}</label>
                        <div class="input-group">
                            <input type="number" class="form-control" name="unequal_{{f.name}}_{{f.userId}}" [(ngModel)]="f.amount">
                            <span class="input-group-addon">%</span>
                        </div>
                    </div>
                </div>

                <button type="submit" class="btn btn-default" [disabled]="!groupForm.form.valid">Submit</button>
            </form>
        </div>
    `
})
export class NewBillComponent implements OnInit {
    model = new Bill(0, '', null, 0, 1, 0, []);
    splitTypes: SplitType[] = [0, 1, 2];
    friends: Friend[] = [];
    friendDebtors: FriendDebtor[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private billService: BillService,
        private groupService: GroupService
    ) {}

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.model.groupId = +params['groupId'];
        });

        this.groupService.getGroup(this.model.groupId)
            .then(group => {
                this.friends = group.friends;
                this.friendDebtors = this.friends.map(f => new FriendDebtor(f.userId, f.name, true, 0));
            });
    }

    onSubmit() {
        console.log(this.friendDebtors);
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
                break;
        }

        this.billService.create(this.model)
            .then(group => {
                this.router.navigate(['/groups', this.model.groupId]);
            });
    }

    calculateDebtorAmount(friendDebtor: FriendDebtor) {
        if (!friendDebtor.isActive) {
            friendDebtor.amount = 0;
        } else {
            friendDebtor.amount = this.model.amount / this.friendDebtors.filter(x => x.isActive).length;
        }

        return friendDebtor.amount;
    }
}