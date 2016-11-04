import { Component, OnInit, Input } from '@angular/core';

import { Bill }  from './bill';
import { Group } from '../groups/group';
import { User }  from '../../user';

import { BillService }    from './bill.service';
import { HelpersService } from '../../helpers.service';

@Component({
    selector: 'bills-list',
    template: `
        <h4>Bills list</h4>

        <ul>
            <li *ngFor="let bill of bills">
                {{ bill.description }}
                {{ bill.amount | currency:'USD':true }}
                Paid by {{ bill.paidBy === currentUser.id ? 'you' : bill.paidBy }}
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
        private helpers: HelpersService) {
        this.currentUser = this.helpers.getStorageProperty("user") as User;
    }
    
    ngOnInit() {
        this.billService.getBills(this.group.id)
            .then(bills => this.bills = bills);
    }
}