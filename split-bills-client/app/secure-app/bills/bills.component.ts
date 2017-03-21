import { Component, 
         OnInit, Input, OnDestroy }  from '@angular/core';
import { Router,
         ActivatedRoute } from '@angular/router';

import { Bill }       from './bill';
import { ClientBill } from './client-bill';
import { Group }      from '../groups/group';
import { Debtor }     from './debtor';
import { User }       from '../../shared-app/models/user';
import { SplitType }  from './split-type';

import { BillService }    from './bill.service';
import { HelpersService } from '../../shared-app/services/helpers.service';    

import { PaidByPipe } from '../../shared-app/pipes/paid-by.pipe';

import { ComponentsInteraction } from '../components-interaction.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'bills-list',
    template: `
        <h4>Bills list</h4>
        <button (click)="addNew();">Add new</button>

        <table *ngIf="bills" class="table table-hover">
            <tr *ngFor="let bill of bills">
                <td>
                    <strong>{{ getBillDescription(bill) }}</strong>
                </td>
                <td>
                    <div class="sub-info">{{ bill.paidBy | paidByName:group.friends }} paid</div>
                    <div *ngIf="bill.splitType != 3"><strong>{{ bill.amount | currency:'USD':true:'1.2-2' }}</strong></div>
                </td>
                <td>
                    <div *ngIf="bill.splitType != 3" class="sub-info">{{ bill.paidBy | paidByName:group.friends:true }}</div>
                    <div [ngClass]="addClass(bill.paidBy)">
                        <strong *ngIf="getLentAmount(bill) != 0">{{ getLentAmount(bill) | currency:'USD':true:'1.2-2' }}</strong>
                    </div>
                    <div class="sub-info" *ngIf="getLentAmount(bill) == 0">not involved</div>
                </td>
            </tr>
        </table>
    `,
    styles: [`
        .sub-info {
            font-size: 10px;
        }
    `]
})
export class BillsComponent implements OnInit {
    @Input() group: Group;

    friendsNames = {};

    bills: Bill[];
    currentUser: User;

    subscription: Subscription;

    constructor(
        private billService: BillService,
        private router: Router,
        private route: ActivatedRoute,
        private helpers: HelpersService,
        private componentsInteraction: ComponentsInteraction) {
        this.currentUser = this.helpers.getUserFromStorage();
        // event is fired by group-detail component
        this.subscription = componentsInteraction.billRefreshed$.subscribe(
            bill => {
                this.bills.push(bill);
            });
    }
    
    ngOnInit(): void {
        this.billService.getBills(this.group.id)
            .then(bills => this.bills = bills);

        this.group.friends.forEach(friend => {
            this.friendsNames[friend.userId] = friend.name;
        });
    }

    addNew(): void {
        this.router.navigate(['../bill/new', { groupId: this.group.id }], { relativeTo: this.route});
    }

    addClass(payerId: number): string {
        if (payerId === this.currentUser.id) {
            return 'positive';
        } else {
            return 'negative';
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getBillDescription(bill: Bill): string {
        if (bill.splitType === SplitType.Payment) {
            return this.friendsNames[bill.paidBy] + " paid " + this.friendsNames[bill.debtors[0].userId];
        } else {
            return bill.description;
        }
    }

    getLentAmount(bill: Bill): Number {
        let self = this;

        let calculateDebt = function (sum, debtor) {
            if (debtor.userId ===  self.currentUser.id) {
                return sum + debtor.amount;
            }
            return sum;
        };

        let calculateCredit = function (sum, debtor) {
            if ( debtor.userId !=  self.currentUser.id) {
                return sum + debtor.amount;
            }
            return sum;
        };

        return bill.debtors.reduce(bill.paidBy === this.currentUser.id ? calculateCredit : calculateDebt, 0);
    }
}