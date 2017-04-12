import { Component, OnDestroy, OnInit } from '@angular/core';

import { HelpersService } from '../../../../common/services/helpers.service';
import { DashboardService } from '../../services/dashboard.service';

import { User } from '../../../../common/models/user';
import { Balance } from '../../../../common/models/balance';
import { Group } from '../../../../common/models/group';

import { Subscription } from 'rxjs/Subscription';
import { BillsRefreshInteraction } from '../../../services/bills-refresh-interaction.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
    currentUser: User;
    finalBalances: Balance[];
    finalDebts: Balance[] = [];
    finalCredits: Balance[] = [];
    totalClass = '';
    unsettledGroups: Group[] = [];
    isSettledUp = false;

    groupId: number;
    group: Group;

    subscription: Subscription;

    constructor(
        private dashboardService: DashboardService,
        private helpers: HelpersService,
        private billsRefreshInteraction: BillsRefreshInteraction
    ) {
        this.currentUser = this.helpers.getUserFromStorage();
        this.subscription = billsRefreshInteraction.billAdded$.subscribe(
            (bill) => {
                if (bill.paidBy === this.currentUser.id || bill.debtors[0].userId === this.currentUser.id) {
                    this.finalBalances.forEach((balance) => {
                        if (balance.friend.userId === bill.paidBy) {
                            balance.amount -= bill.amount;
                        } else if (balance.friend.userId === bill.debtors[0].userId) {
                            balance.amount += bill.amount;
                        }
                    });

                    this.divideBalances();
                }
            });
    }

     ngOnInit(): void {
         this.dashboardService.getTotalBalancesForUser(this.currentUser.id)
            .then((result) => {
                this.finalBalances = result.totalUserBalances;
                this.unsettledGroups = result.unsettledGroups;
                this.divideBalances();
            });
     }

     divideBalances(): void {
         this.totalClass = this.getTotalClass();
         this.finalDebts = this.finalBalances.filter((r) => r.amount < 0);
         this.finalCredits = this.finalBalances.filter((r) => r.amount > 0);
         this.isSettledUp = this.finalDebts.length === 0 && this.finalCredits.length === 0;
     }

     getTotalValue(array): number {
         if (array) {
             let total = 0;
             array.forEach((el) => {
                 total += el.amount;
             });

             return total;
         }
     }

     getTotalClass(): string {
         if (this.getTotalValue(this.finalBalances) >= 0) {
             return 'positive';
         } else {
             return 'negative';
         }
     }

     getGroupForSettleUp(id): void {
         this.groupId = id;
         this.group = this.unsettledGroups.find((group) => group.id == this.groupId);
     }

     ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
