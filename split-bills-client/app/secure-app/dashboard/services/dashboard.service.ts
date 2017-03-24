import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { BillService } from '../../bills/services/bill.service';
import { FriendService } from '../../friends/services/friend.service';
import { GroupService } from '../../groups/services/group.service';

import { Bill } from '../../bills/models/bill';
import { Friend } from '../../friends/models/friend';
import { Balance } from '../../groups/models/balance';
import { Group } from '../../groups/models/group';
import { DashboardResult } from '../models/dashboard-result';

@Injectable()
export class DashboardService {
    private groupsUrl = 'app/groups'; // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http,
        private friendService: FriendService,
        private groupService: GroupService,
        private billService: BillService) { }

    getTotalBalancesForUser(userId: number): Promise<DashboardResult> {
        const self = this;
        const friendsNames = {};
        const unsettledGroups: Group[] = [];

        const getBillsOfUnsettledGroups = (group: Group): Promise<Bill[]> => {
             return Promise.resolve(self.groupService.getBalances(group.id)
                .then((balances) => {
                    const userBalance = balances.find((value, index, arr) => {
                        if (value.friend.userId === userId) {
                            return true;
                        }
                    });

                    if (userBalance.amount !== 0) {
                        unsettledGroups.push(group);
                        return Promise.resolve(self.billService.getBills(group.id));
                    }
                }));
         };

        return this.friendService.getFriends(userId)
            .then((friends) => {
                // create dictionary of friends names for quick access by userId
                friends.forEach((friend) => {
                    friendsNames[friend.userId] = friend.name;
                });

                return this.groupService.getUserGroups(userId)
                    .then((groups) => {
                        return Promise.all(groups.map(getBillsOfUnsettledGroups))
                            .then((groupBills) => {

                                let allBills = [];

                                // tslint:disable-next-line:max-line-length
                                // create from two-dimensioal array (array of Bill[]) one-dimensial array of allBills (Bill)
                                groupBills.forEach((bills) => {
                                    if (bills) { // empty bills are returned by settled groups
                                        allBills = allBills.concat(bills);
                                    }
                                });

                                // create creadits and debts array for currentUser from allBills
                                const myCredits = [];
                                const myDebts = [];
                                allBills.forEach((bill) => {
                                    if (bill.paidBy === userId) {
                                        myCredits.push(bill);
                                    } else {
                                        myDebts.push(bill);
                                    }
                                });

                                // transform credits and debts to dashboard result
                                const dashboardResult = {};
                                myCredits.forEach((credit) => {
                                    credit.debtors.forEach((debtor) => {
                                        if (debtor.userId !== userId) {
                                            if (!dashboardResult[debtor.userId]) {
                                                dashboardResult[debtor.userId] = debtor.amount;
                                            } else {
                                                dashboardResult[debtor.userId] += debtor.amount;
                                            }
                                        }
                                    });
                                });
                                myDebts.forEach((debt) => {
                                    debt.debtors.forEach((debtor) => {
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
                                const finalBalances = [];
                                for (const key in dashboardResult) {
                                    finalBalances.push(
                                        new Balance(
                                            new Friend(friendsNames[parseInt(key)], parseInt(key)),
                                            dashboardResult[key])
                                    );
                                }

                                return new DashboardResult(unsettledGroups, finalBalances);
                            });
                    });
            });
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
