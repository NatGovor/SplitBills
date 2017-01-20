import { Component, Input, OnInit } from '@angular/core';

import { Group }   from './group';
import { Balance } from './balance';
import { Friend }  from '../friends/friend';

import { GroupService } from './group.service';

import { MakePositivePipe } from '../../pipes/make-positive.pipe';

@Component({
    selector: 'group-balances',
    template: `
        <h4>Group Balances</h4>
        <ul>
            <li *ngFor="let balance of balances">
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
    `]
})
export class GroupBalancesComponent implements OnInit {
    @Input()
    group: Group;

    balances: Balance[];

    constructor(private groupService: GroupService) {}

    ngOnInit() {
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
                    This person does not have an email address, and will not receive notifications about bills.
                </div>
            `
            return toolTipHtml;
        }
    }
}