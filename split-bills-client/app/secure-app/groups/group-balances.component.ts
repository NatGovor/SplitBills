import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router }    from '@angular/router';

import { Group }   from './group';
import { Balance } from './balance';
import { Friend }  from '../friends/friend';

import { GroupService } from './group.service';

import { MakePositivePipe } from '../../pipes/make-positive.pipe';

import { ComponentsInteraction } from '../components-interaction.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'group-balances',
    template: `
        <h4>Group Balances</h4>
        <ul class="balances">
            <li *ngFor="let balance of balances" (click)="gotoDetail(balance.friend)">
                <template #toolTipTemplate><div [innerHtml]="getTooltip(balance.friend)"></div></template>
                <div [tooltip]="!balance.friend.email ? toolTipTemplate : ''"
                     placement="left">
                    {{balance.friend.name}}
                    <span *ngIf="!balance.friend.email" class="glyphicon glyphicon-alert"></span>
                </div>
                <div *ngIf="balance.amount == 0">
                    <span>settled up</span>
                </div>
                <div *ngIf="balance.amount != 0"
                     [ngClass]="addClass(balance.amount)">
                    <span *ngIf="balance.amount > 0">gets back </span>
                    <span *ngIf="balance.amount < 0">owes </span>
                    {{balance.amount | makePositive | currency:'USD':true:'1.2-2' }}
                </div>
            </li>
        </ul>
    `,
    styles: [`
        :host >>> .tooltip-inner {
            text-align: left;
        }
        .balances li:hover {
            background-color: #f5f5f5;
            cursor: pointer;
        }
    `]
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