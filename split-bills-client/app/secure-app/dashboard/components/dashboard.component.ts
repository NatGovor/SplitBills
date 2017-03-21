import { Component, OnInit, OnDestroy } from '@angular/core';

import { DashboardService }   from '../services/dashboard.service';
import { HelpersService } from '../../../shared-app/services/helpers.service';

import { User } from '../../../shared-app/models/user';
import { Balance } from '../../groups/models/balance';
import { Group } from '../../groups/models/group';

import { MakePositivePipe } from '../../../shared-app/pipes/make-positive.pipe';

import { ComponentsInteraction } from '../../services/components-interaction.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './app/secure-app/dashboard/components/dashboard.component.html',
    styleUrls: ['./app/secure-app/dashboard/components/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    currentUser: User;
    finalBalances: Balance[];
    finalDebts: Balance[] = [];
    finalCredits: Balance[] = [];
    totalClass = '';
    unsettledGroups: Group[] = [];
    isSettledUp = false;

    groupId: Number;
    group: Group;

    subscription: Subscription;

    constructor(
        private dashboardService: DashboardService,
        private helpers: HelpersService,
        private componentsInteraction: ComponentsInteraction
    ) {
        this.currentUser = this.helpers.getUserFromStorage();;
        this.subscription = componentsInteraction.billAdded$.subscribe(
            bill => {
                if (bill.paidBy === this.currentUser.id || bill.debtors[0].userId === this.currentUser.id) {
                    this.finalBalances.forEach(balance => {
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
            .then(result => {
                this.finalBalances = result.totalUserBalances;
                this.unsettledGroups = result.unsettledGroups;
                this.divideBalances();
            });
     }

     divideBalances(): void {
         this.totalClass = this.getTotalClass();
         this.finalDebts = this.finalBalances.filter(r => r.amount < 0);
         this.finalCredits = this.finalBalances.filter(r => r.amount > 0);
         this.isSettledUp = this.finalDebts.length == 0 && this.finalCredits.length == 0;
     }

     getTotalValue(array): Number {
         if (array) {
             let total = 0;
             array.forEach(el => {
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
         this.group = this.unsettledGroups.find(group => group.id == this.groupId);
     }

     ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}