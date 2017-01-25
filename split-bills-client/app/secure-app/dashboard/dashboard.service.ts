import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { FriendService } from '../friends/friend.service';
import { GroupService } from '../groups/group.service';
import { BillService } from '../bills/bill.service';

import { Group } from '../groups/group';
import { Bill } from '../bills/bill';
import { Balance } from '../groups/balance';
import { Friend } from '../friends/friend';

@Injectable()
export class DashboardService {
    private groupsUrl = 'app/groups'; // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http,
        private friendService: FriendService,
        private groupService: GroupService,
        private billService: BillService) { }

    getTotalBalancesForUser(userId: number): Promise<Balance[]> {
        let self = this;
        let friendsNames = {};

        var getBillsOfUnsettledGroups = function(group: Group): Promise<Bill[]> {
             return Promise.resolve(self.groupService.getBalances(group.id)
                .then(balances => {
                    var userBalance = balances.find(function(value, index, arr) {
                        if (value.friend.userId === userId) {
                            return true;
                        }
                    });

                    if (userBalance.amount !== 0) {
                        return Promise.resolve(self.billService.getBills(group.id));
                    }
                }));
         };

        return this.friendService.getFriends(userId)
            .then(friends => {
                // create dictionary of friends names for quick access by userId
                friends.forEach(friend => {
                    friendsNames[friend.userId] = friend.name;
                });

                return this.groupService.getUserGroups(userId)
                    .then(groups => {
                        return Promise.all(groups.map(getBillsOfUnsettledGroups))
                            .then(groupBills => {
                                
                                let allBills = [];

                                // create from two-dimensioal array (array of Bill[]) one-dimensial array of allBills (Bill)                        
                                groupBills.forEach(bills => {
                                    if (bills) { // empty bills are returned by settled groups
                                        allBills = allBills.concat(bills);
                                    }
                                });

                                // create creadits and debts array for currentUser from allBills
                                let myCredits = [];
                                let myDebts = [];
                                allBills.forEach(bill => {
                                    if (bill.paidBy === userId) {
                                        myCredits.push(bill);
                                    } else {
                                        myDebts.push(bill);
                                    }
                                });

                                // transform credits and debts to dashboard result
                                var dashboardResult = {};
                                myCredits.forEach(credit => {
                                    credit.debtors.forEach(debtor => {
                                        if (debtor.userId !== userId) {
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
                                        if (debtor.userId === userId) {
                                            if (!dashboardResult[debt.paidBy]) {
                                                dashboardResult[debt.paidBy] = -debtor.amount;
                                            } else {
                                                dashboardResult[debt.paidBy] -= debtor.amount;
                                            }
                                        }
                                    });
                                });

                                // create final dashboard balances
                                var finalBalances = [];
                                for (var key in dashboardResult) {
                                    finalBalances.push(
                                        new Balance(
                                            new Friend(friendsNames[parseInt(key)], parseInt(key)), 
                                            dashboardResult[key])
                                    );
                                }

                                return finalBalances;
                            });
                    });
            });
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}