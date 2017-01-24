import { Component, OnInit } from '@angular/core';

import { GroupService }   from '../groups/group.service';
import { HelpersService } from '../../helpers.service';
import { BillService }    from '../bills/bill.service';
import { FriendService }  from '../friends/friend.service';

import { Bill } from '../bills/bill';
import { User }    from '../../user';
import { Group }   from '../groups/group';
import { Friend }  from '../friends/friend';
import { Balance } from '../groups/balance';

import { MakePositivePipe } from '../../pipes/make-positive.pipe';

@Component({
    template: `
        <h2>Dashboard</h2>
        <div class="row">
            <div class="col-xs-6 negatives">
                <div class="text-uppercase text-left"><b>You owe</b></div>
                <div *ngFor="let res of finalDebts" class="balance">
                    <div>{{ res.friend.name }}</div>
                    <div class="negative">you owe {{ res.amount | makePositive | currency:'USD':true:'1.2-2' }}</div>
                </div>
            </div>            
            <div class="col-xs-6 positives">
                <div class="text-uppercase text-right"><b>You are owed</b></div>
                <div *ngFor="let res of finalCredits" class="balance">
                    <div>{{ res.friend.name }}</div>
                    <div class="positive">owes you {{ res.amount | makePositive | currency:'USD':true:'1.2-2' }}</div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .negatives {
            border-right: 1px solid #eee;
        }
        .balance {
            margin-bottom: 10px;
        }
    `]
})
export class DashboardComponent implements OnInit {
    groups: Group[] = [];
    allBills: Bill[] = [];
    currentUser: User;
    friendsNames = {};

    finalResult: Balance[] = [];
    finalDebts: Balance[] = [];
    finalCredits: Balance[] = [];

    constructor(
        private groupService: GroupService,
        private helpers: HelpersService,
        private billService: BillService,
        private friendService: FriendService
    ) {
        this.currentUser = this.helpers.getStorageProperty("user") as User;
    }

     ngOnInit() {
         var self = this;

         var getBillsOfUnsettledGroups = function(group: Group): Promise<Bill[]> {
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

         this.friendService.getFriends(this.currentUser.id)
            .then(friends => {
                // create dictionary of friends names for quick access by userId
                friends.forEach(friend => {
                    this.friendsNames[friend.userId] = friend.name;
                });

                this.groupService.getUserGroups(this.currentUser.id)
                    .then(groups => {
                        Promise.all(groups.map(getBillsOfUnsettledGroups))
                            .then(groupBills => {
                                // create from two-dimensioal array (array of Bill[]) one-dimensial array of allBills (Bill)                        
                                groupBills.forEach(bills => {
                                    if (bills) { // empty bills are returned by settled groups
                                        this.allBills = this.allBills.concat(bills);
                                    }
                                });

                                let myCredits = [];
                                let myDebts = [];
                                this.allBills.forEach(bill => {
                                    if (bill.paidBy === this.currentUser.id) {
                                        myCredits.push(bill);
                                    } else {
                                        myDebts.push(bill);
                                    }
                                });

                                var dashboardResult = {};
                                myCredits.forEach(credit => {
                                    credit.debtors.forEach(debtor => {
                                        if (debtor.userId !== this.currentUser.id) {
                                            if (!dashboardResult[debtor.userId]) {
                                                dashboardResult[debtor.userId] = debtor.amount;
                                            } else {
                                                dashboardResult[debtor.userId] += debtor.amount;
                                            }
                                        }
                                    })
                                    
                                });

                                myDebts.forEach(debt => {
                                    debt.debtors.forEach(debtor => {
                                        if (debtor.userId !== this.currentUser.id) {
                                            if (!dashboardResult[debtor.userId]) {
                                                dashboardResult[debtor.userId] = -debtor.amount;
                                            } else {
                                                dashboardResult[debtor.userId] -= debtor.amount;
                                            }
                                        }
                                    });
                                });

                                for (var key in dashboardResult) {
                                    this.finalResult.push(
                                        new Balance(
                                            new Friend(this.friendsNames[parseInt(key)], parseInt(key)), 
                                            dashboardResult[key])
                                    );
                                }

                                this.finalDebts = this.finalResult.filter(r => r.amount < 0);
                                this.finalCredits = this.finalResult.filter(r => r.amount > 0);
                            });
                    });
            });
     }
}