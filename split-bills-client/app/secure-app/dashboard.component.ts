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
    myDebts = [];
    myCredits = [];

    constructor(
        private groupService: GroupService,
        private helpers: HelpersService,
        private billService: BillService
    ) {
        this.currentUser = this.helpers.getStorageProperty("user") as User;
    }

     ngOnInit() {
         var self = this;

         var getUnsettledGroups = function(group: Group): Promise<Bill[]> {
             return Promise.resolve(self.groupService.getBalances(group.id)
                .then(balances => {
                    var userBalance = balances.find(function(value, index, arr) {
                        if (value.friend.userId === self.currentUser.id) {
                            return true;
                        }
                    });

                    if (userBalance.amount !== 0) {
                        return Promise.resolve(self.billService.getBills(group.id));
                    }
                }));
         };

         this.groupService.getUserGroups(this.currentUser.id)
            .then(groups => {
                Promise.all(groups.map(getUnsettledGroups))
                    .then(bills => {                        
                        bills.forEach(bill => {
                            if (bill) {
                                self.bills = self.bills.concat(bill);
                            }
                        });

                        self.bills.forEach(bill => {
                            if (bill.paidBy === self.currentUser.id) {
                                self.myCredits.push(bill);
                            } else {
                                self.myDebts.push(bill);
                            }
                        });

                        var dashboardResult = {};
                        self.myCredits.forEach(credit => {
                            credit.debtors.forEach(debtor => {
                                if (debtor.userId !== self.currentUser.id) {
                                    if (!dashboardResult[debtor.userId]) {
                                        dashboardResult[debtor.userId] = debtor.amount;
                                    } else {
                                        dashboardResult[debtor.userId] += debtor.amount;
                                    }
                                }
                            })
                            
                        });

                        self.myDebts.forEach(debt => {
                            debt.debtors.forEach(debtor => {
                                if (debtor.userId !== self.currentUser.id) {
                                    if (!dashboardResult[debtor.userId]) {
                                        dashboardResult[debtor.userId] = -debtor.amount;
                                    } else {
                                        dashboardResult[debtor.userId] -= debtor.amount;
                                    }
                                }
                            });
                        });

                        console.log(self.myCredits);
                        console.log(self.myDebts);
                        console.log(dashboardResult);
                    });
            });
     }

     diagnostic(x) { return JSON.stringify(x); }
}