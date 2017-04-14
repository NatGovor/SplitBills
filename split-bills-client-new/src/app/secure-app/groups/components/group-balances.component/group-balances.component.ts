import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Friend } from '../../../../common/models/friend';
import { Balance } from '../../../../common/models/balance';
import { Group } from '../../../../common/models/group';

import { GroupService } from '../../services/group.service';

import { Subscription } from 'rxjs/Subscription';
import { BillsRefreshInteraction } from '../../../services/bills-refresh-interaction.service';

@Component({
    selector: 'app-group-balances',
    templateUrl: './group-balances.component.html',
    styleUrls: ['./group-balances.component.css']
})
export class GroupBalancesComponent implements OnInit, OnDestroy {
    @Input()
    group: Group;

    balances: Balance[];

    subscription: Subscription;

    constructor(
        private groupService: GroupService,
        private billsRefreshInteraction: BillsRefreshInteraction,
        private router: Router) {
        // event is fired by group-detail component
        this.subscription = billsRefreshInteraction.billRefreshed$.subscribe(
            (bill) => {
                bill.debtors.forEach((debtor) => {
                    this.balances.forEach((balance) => {
                        if (balance.friend.userId === debtor.userId) {
                            balance.amount -= debtor.amount;
                        }
                        if (balance.friend.userId === bill.paidBy) {
                            balance.amount += bill.amount;
                        }
                    });
                });
            });
    }

    ngOnInit(): void {
        this.groupService.getBalancesForGroup(this.group.id).then((balances) => {
            this.balances = balances;
        });
    }

    addClass(amount: number): string {
        if (amount >= 0) {
            return 'positive';
        } else {
            return 'negative';
        }
    }

    getTooltip(friend: Friend): string {
        if (!friend.email) {
            const toolTipHtml = `
                <div><b>` + friend.name + `</b></div>
                <div>
                    <span class="glyphicon glyphicon-alert"></span>
                    This person does not have an email address (or not confirmed it yet), and will not receive notifications about bills.
                </div>
            `;
            return toolTipHtml;
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    gotoDetail(friend: Friend): void {
        this.router.navigate(['friends', friend.userId]);
    }
}
