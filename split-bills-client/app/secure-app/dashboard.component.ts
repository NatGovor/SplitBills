import { Component, OnInit } from '@angular/core';

import { GroupService }   from './groups/group.service';
import { HelpersService } from '../helpers.service';
import { BillService }    from './bills/bill.service';

import { Bill } from './bills/bill';
import { User }    from '../user';
import { Group }   from './groups/group';

@Component({
    template: `
        <h2>Dashboard</h2>
        <div class="row">
            <div class="col-xs-6 negatives">
                <div class="text-uppercase text-left"><b>You owe</b></div>
            </div>            
            <div class="col-xs-6 positives">
                <div class="text-uppercase text-right"><b>You are owed</b></div>
            </div>
        </div>

        <ul>
            <li *ngFor="let bill of bills">{{ diagnostic(bill) }}</li>
        </ul>
    `,
    styles: [`
        .negatives {
            border-right: 1px solid #eee;
        }
    `]
})
export class DashboardComponent implements OnInit {
    groups: Group[] = [];
    bills: Bill[] = [];
    currentUser: User;

    constructor(
        private groupService: GroupService,
        private helpers: HelpersService,
        private billService: BillService
    ) {
        this.currentUser = this.helpers.getStorageProperty("user") as User;
    }

     ngOnInit() {
         var self = this;

         this.groupService.getUserGroups(this.currentUser.id)
            .then(groups => {
                groups.forEach(group => {
                   this.groupService.getBalances(group.id).then(balances => {
                       var userBalance = balances.find(function(value, index, arr) {
                           if (value.friend.userId === self.currentUser.id) {
                               return true;
                           }
                       })

                       if (userBalance.amount !== 0) { // look into only unsettled groups
                           this.groups.push(group);

                           this.billService.getBills(group.id)
                                .then(bills => {
                                    bills.forEach(bill => {
                                        if (bill.paidBy === self.currentUser.id) {
                                            self.bills.push(bill);
                                        }
                                        // add bills where currentUser is involved
                                    });
                                });
                       }
                    });
                });
            });
     }

     diagnostic(x) { return JSON.stringify(x); }
}