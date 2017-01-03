import { Component, Input, OnInit } from '@angular/core';

import { Group }   from './group';
import { Balance } from './balance';

import { GroupService } from './group.service';

import { MakePositivePipe } from '../../pipes/make-positive.pipe';

@Component({
    selector: 'group-balances',
    template: `
        <h4>Group Balances</h4>
        <ul>
            <li *ngFor="let balance of balances">
                <div>{{balance.friend.name}}</div>
                <div *ngIf="balance.amount == 0">
                    <span>settled up</span>
                </div>
                <div *ngIf="balance.amount != 0"
                     [ngClass]="addClass(balance.amount)">
                    <span *ngIf="balance.amount > 0">gets back </span>
                    <span *ngIf="balance.amount < 0">owes </span>
                    {{balance.amount | makePositive }}
                </div>
            </li>
        </ul>
    `
})
export class GroupBalancesComponent implements OnInit {
    @Input()
    group: Group;

    balances: Balance[];

    constructor(private groupService: GroupService) {}

    ngOnInit() {
        this.groupService.getBalances(this.group.id).then(balances => {
            this.balances = balances;
            console.log(this.balances);
        });
    }

    addClass(amount: number): string {
        if (amount >= 0) {
            return 'positive';
        } else {
            return 'negative';
        }
    }
}