import { Component, 
         OnInit, Input }  from '@angular/core';
import { Router,
         ActivatedRoute } from '@angular/router';

import { Bill }       from './bill';
import { ClientBill } from './client-bill';
import { Group }      from '../groups/group';
import { Debtor }     from './debtor';
import { User }       from '../../user';

import { BillService }    from './bill.service';
import { HelpersService } from '../../helpers.service';     

@Component({
    selector: 'bills-list',
    template: `
        <h4>Bills list</h4>
        <button (click)="addNew();">Add new</button>

        <table *ngIf="bills" class="table table-hover">
            <tr *ngFor="let bill of bills">
                <td>
                    <strong>{{ bill.description }}</strong>
                </td>
                <td>
                    <div class="sub-info">{{ bill.paidBy | paidByName:group.friends }} paid</div>
                    <div><strong>{{ bill.amount | currency:'USD':true }}</strong></div>
                </td>
                <td>
                    <div class="sub-info">{{ bill.paidBy | paidByName:group.friends:true }}</div>
                    <div [ngClass]="addClass(bill.paidBy)">
                        <strong>{{ bill.paidBy | lentAmount:bill.debtors | currency:'USD':true }}</strong>
                    </div>
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
    @Input()
    group: Group;

    bills: Bill[];

    currentUser: User;

    constructor(
        private billService: BillService,
        private router: Router,
        private route: ActivatedRoute,
        private helpers: HelpersService) {
        this.currentUser = this.helpers.getStorageProperty("user") as User;
    }
    
    ngOnInit() {
        this.billService.getBills(this.group.id)
            .then(bills => this.bills = bills);
    }

    addNew() {
        this.router.navigate(['../bill/new', { groupId: this.group.id }], { relativeTo: this.route});
    }

    addClass(payerId: number): string {
        if (payerId === this.currentUser.id) {
            return 'positive';
        } else {
            return 'negative';
        }
    }
}