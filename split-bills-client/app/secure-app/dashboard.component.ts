import { Component, OnInit } from '@angular/core';

import { GroupService }   from './groups/group.service';
import { HelpersService } from '../helpers.service';

import { Balance } from './groups/balance';
import { User }    from '../user';

@Component({
    template: `
        <h2>Dashboard</h2>
        <div class="row">
            <div class="col-xs-6 negatives">
                <div class="text-uppercase text-left"><b>You owe</b></div>
            </div>            
            <div class="col-xs-6 positives">
                <div class="text-uppercase text-right"><b>You are owed</b></div>
            </div>
        </div>
    `,
    styles: [`
        .negatives {
            border-right: 1px solid #eee;
        }
    `]
})
export class DashboardComponent implements OnInit {
    balances: Balance[] = [];

    constructor(
        private groupService: GroupService,
        private helpers: HelpersService
    ) {}

     ngOnInit() {
         this.groupService.getUserGroups((this.helpers.getStorageProperty("user") as User).id)
            .then(groups => {
                groups.forEach(group => {
                   this.groupService.getBalances(group.id).then(balances => {
                        balances.forEach(balance => {
                            var totalBalance = this.balances.find(function (element, index, array) {
                                if (element.friend.userId === balance.friend.userId) {
                                    return true;
                                }
                            });
                            if (totalBalance) {
                                totalBalance.amount += balance.amount;
                            } else {
                                this.balances.push(balance);
                            }
                        });
                        console.log(this.balances);
                    });
                });
            });
     }
}