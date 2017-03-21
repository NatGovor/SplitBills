import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Group } from '../models/group';
import { Balance } from '../models/balance';
import { Friend } from '../../friends/models/friend';

import { GroupService } from '../services/group.service';

import { MakePositivePipe } from '../../../shared-app/pipes/make-positive.pipe';

import { ComponentsInteraction } from '../../services/components-interaction.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'group-balances',
    templateUrl: './app/secure-app/groups/components/group-balances.component.html',
    styleUrls: ['./app/secure-app/groups/components/group-balances.component.css']
})
export class GroupBalancesComponent implements OnInit {
    @Input()
    group: Group;

    balances: Balance[];

    subscription: Subscription;

    constructor(
        private groupService: GroupService,
        private componentsInteraction: ComponentsInteraction,
        private router: Router) {
        // event is fired by group-detail component
        this.subscription = componentsInteraction.billRefreshed$.subscribe(
            bill => {
                bill.debtors.forEach(debtor => {
                    this.balances.forEach(balance => {
                        if (balance.friend.userId === debtor.userId) {
                            balance.amount -= debtor.amount;
                        }
                        if (balance.friend.userId === bill.paidBy) {
                            balance.amount += bill.amount;
                        }
                    })
                });
            });
    }

    ngOnInit(): void {
        this.groupService.getBalances(this.group.id).then(balances => {
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
            let toolTipHtml = `
                <div><b>` + friend.name + `</b></div>
                <div>
                    <span class="glyphicon glyphicon-alert"></span>
                    This person does not have an email address (or not confirmed it yet), and will not receive notifications about bills.
                </div>
            `
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