import { Component, OnInit, Input } from '@angular/core';

import { Bill } from './bill';
import { Group } from '../groups/group';

import { BillService } from './bill.service';

@Component({
    selector: 'bills-list',
    template: `
        <h4>Bills list</h4>

        <ul>
            <li *ngFor="let bill of bills">
                {{ bill.id }}
                {{ bill.description }}
                {{ bill.amount | currency:'USD':true }}
                {{ bill.paidBy }}
                {{ bill.splitType }}
            </li>
        </ul>
    `
})
export class BillsComponent implements OnInit {
    @Input()
    group: Group;
    bills: Bill[];

    constructor(private billService: BillService) {}
    
    ngOnInit() {
        this.billService.getBills(this.group.id)
            .then(bills => this.bills = bills);
    }
}