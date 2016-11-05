import { Component, 
         OnInit, Input }  from '@angular/core';
import { Router,
         ActivatedRoute } from '@angular/router';

import { Bill }       from './bill';
import { ClientBill } from './client-bill';
import { Group }      from '../groups/group';
import { User }       from '../../user';

import { BillService }    from './bill.service';
import { HelpersService } from '../../helpers.service';

@Component({
    selector: 'bills-list',
    template: `
        <h4>Bills list</h4>
        <button (click)="addNew();">Add new</button>

        <ul *ngIf="bills">
            <li *ngFor="let bill of clientBills">
                {{ bill.description }}
                {{ bill.amount | currency:'USD':true }}
                Paid by {{ bill.paidByName }}
            </li>
        </ul>
    `
})
export class BillsComponent implements OnInit {
    @Input()
    group: Group;

    bills: Bill[];
    currentUser: User;

    constructor(
        private billService: BillService,
        private helpers: HelpersService,
        private router: Router,
        private route: ActivatedRoute) {
        this.currentUser = this.helpers.getStorageProperty("user") as User;
    }

    get clientBills(): ClientBill[] {
        return this.bills.map(bill => {
            let payer = this.group.friends.find(f => f.userId === bill.paidBy);
            return new ClientBill(bill.id, bill.description, bill.amount, payer.userId === this.currentUser.id ? 'you' : payer.name);
        });
    }
    
    ngOnInit() {
        this.billService.getBills(this.group.id)
            .then(bills => this.bills = bills);
    }

    addNew() {
        this.router.navigate(['../bill/new'], { relativeTo: this.route});
    }
}