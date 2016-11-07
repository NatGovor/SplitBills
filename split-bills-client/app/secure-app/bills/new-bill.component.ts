import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, 
         Params }            from '@angular/router';

import { Bill }      from './bill';
import { SplitType } from './split-type';
import { Friend }    from '../friends/friend';

import { BillService }  from './bill.service';
import { GroupService } from '../groups/group.service';

import { SplitTypePipe } from './split-type.pipe';
import { PaidByPipe }    from './paid-by.pipe';

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
                    <label>Amount (USD)</label>
                    <input type="number" class="form-control" id="amount"
                        required
                        [(ngModel)]="model.amount" name="amount">
                </div>
                <div class="form-group">
                    <label>Split type</label>
                    <select class="form-control" id="splitType" 
                            required
                            [(ngModel)]="model.splitType" name="splitType">
                        <option *ngFor="let type of splitTypes" [value]="type">{{type | splitTypeName }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Paid By</label>
                    <select class="form-control" id="paidBy" 
                            required
                            [(ngModel)]="model.paidBy" name="paidBy">
                        <option *ngFor="let f of friends" [value]="f.userId">{{f.userId | paidByName:friends}}</option>
                    </select>
                </div>

                <button type="submit" class="btn btn-default" [disabled]="!groupForm.form.valid">Submit</button>
            </form>
        </div>
    `
})
export class NewBillComponent implements OnInit {
    model = new Bill(0, '', null, 0, 1, 0);
    splitTypes: SplitType[] = [0];
    friends: Friend[] = [];

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
            .then(group => this.friends = group.friends);
    }

    onSubmit() {
        this.model.paidBy = +this.model.paidBy;
        this.model.splitType = +this.model.splitType;
        console.log(this.model);

        this.billService.create(this.model)
            .then(group => {
                this.router.navigate(['/groups', this.model.groupId]);
            });
    }
}