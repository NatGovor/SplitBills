import { Component, OnInit } from '@angular/core';

import { Bill } from './bill';

import { BillService } from './bill.service';

@Component({
    selector: 'bills-list',
    template: `
        <h3>Bills list</h3>

        <ul>
            <li *ngFor="let bill of bills">
                {{ bill.id }}
                {{ bill.description }}
                {{ bill.amount | currency:'USD':true }}
                {{ bill.groupId }}
                {{ bill.paidBy }}
                {{ bill.splitType }}
            </li>
        </ul>
    `
})
export class BillsComponent implements OnInit {
    bills: Bill[];

    constructor(private billService: BillService) {}
    
    ngOnInit() {
        this.billService.getBills()
            .then(bills => this.bills = bills);
    }
}