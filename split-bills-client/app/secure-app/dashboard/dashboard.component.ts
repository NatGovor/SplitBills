import { Component, OnInit } from '@angular/core';

import { DashboardService }   from './dashboard.service';
import { HelpersService } from '../../helpers.service';

import { User } from '../../user';
import { Balance } from '../groups/balance';
import { Group } from '../groups/group';

import { MakePositivePipe } from '../../pipes/make-positive.pipe';

@Component({
    template: `
        <div class="row header-row">
            <div class="col-xs-8">
                <h2>Dashboard</h2>
            </div>
            <div class="col-xs-4">
                <button class="important-btn" (click)="modal.show()">Settle up</button>
            </div>
        </div>
        <div class="row total-header">
            <div class="col-xs-4 total-balance">
                <div>total balance</div>
                <div  [ngClass]="totalClass">{{ getTotalValue(finalBalances) | currency:'USD':true:'1.2-2' }}</div>
            </div>
            <div class="col-xs-4 total-balance">
                <div>you owe</div>
                <div class="negative">{{ getTotalValue(finalDebts) | currency:'USD':true:'1.2-2' }}</div>
            </div>
            <div class="col-xs-4 total-balance">
                <div>you are owed</div>
                <div class="positive">{{ getTotalValue(finalCredits) | currency:'USD':true:'1.2-2' }}</div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-6 negatives">
                <div class="text-uppercase text-left balance-header"><b>You owe</b></div>
                <div *ngFor="let res of finalDebts" class="balance">
                    <div>{{ res.friend.name }}</div>
                    <div class="negative">you owe {{ res.amount | makePositive | currency:'USD':true:'1.2-2' }}</div>
                </div>
            </div>            
            <div class="col-xs-6 positives">
                <div class="text-uppercase text-right balance-header"><b>You are owed</b></div>
                <div *ngFor="let res of finalCredits" class="balance">
                    <div>{{ res.friend.name }}</div>
                    <div class="positive">owes you {{ res.amount | makePositive | currency:'USD':true:'1.2-2' }}</div>
                </div>
            </div>
        </div>

        <div class="modal fade" bsModal #modal="bs-modal"
            tabindex="-1"
            role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title pull-left">Settle up</h4>
                        <button type="button" class="close pull-right" (click)="modal.hide()">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Choose a group to settle up
                        <select class="form-control">
                            <option *ngFor="let group of unsettledGroups" [value]="group.id">{{ group.name }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .negatives {
            border-right: 1px solid #eee;
        }
        .balance-header {
            border-bottom: 1px solid #eee;
            padding: 5px 0;
        }
        .balance {
            margin: 5px 0 10px;
        }
        .total-header {
            background-color: #eee;
            text-align: center;
            margin: 15px 0;
        }
        .total-header .total-balance {
            border-left: 1px solid #888;
        }
        .total-header .total-balance:first-child {
            border-left: none;
        }
        .header-row button {
            margin-top: 20px;
        }
    `]
})
export class DashboardComponent implements OnInit {
    currentUser: User;
    finalBalances: Balance[];
    finalDebts: Balance[] = [];
    finalCredits: Balance[] = [];
    totalClass = '';
    unsettledGroups: Group[] = [];

    constructor(
        private dashboardService: DashboardService,
        private helpers: HelpersService
    ) {
        this.currentUser = this.helpers.getStorageProperty("user") as User;
    }

     ngOnInit() {
         this.dashboardService.getTotalBalancesForUser(this.currentUser.id)
            .then(result => {
                this.finalBalances = result.totalUserBalances;
                this.unsettledGroups = result.unsettledGroups;
                this.totalClass = this.getTotalClass();
                this.finalDebts = this.finalBalances.filter(r => r.amount < 0);
                this.finalCredits = this.finalBalances.filter(r => r.amount > 0);
            });
     }

     getTotalValue(array) {
         if (array) {
             let total = 0;
             array.forEach(el => {
                 total += el.amount;
             });

             return total;
         }
     }

     getTotalClass() {
         if (this.getTotalValue(this.finalBalances) >= 0) {
             return 'positive';
         } else {
             return 'negative';
         }
     }
}