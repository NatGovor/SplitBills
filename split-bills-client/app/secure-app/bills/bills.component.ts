import { Component, 
         OnInit, Input }  from '@angular/core';
import { Router,
         ActivatedRoute } from '@angular/router';

import { Bill }       from './bill';
import { ClientBill } from './client-bill';
import { Group }      from '../groups/group';

import { BillService } from './bill.service';

import { PaidByPipe } from './paid-by.pipe';

@Component({
    selector: 'bills-list',
    template: `
        <h4>Bills list</h4>
        <button (click)="addNew();">Add new</button>

        <ul *ngIf="bills">
            <li *ngFor="let bill of bills">
                {{ bill.description }}
                {{ bill.amount | currency:'USD':true }}
                Paid by {{ bill.paidBy | paidByName:group.friends }}
            </li>
        </ul>
    `
})
export class BillsComponent implements OnInit {
    @Input()
    group: Group;

    bills: Bill[];

    constructor(
        private billService: BillService,
        private router: Router,
        private route: ActivatedRoute) {
    }
    
    ngOnInit() {
        this.billService.getBills(this.group.id)
            .then(bills => this.bills = bills);
    }

    addNew() {
        this.router.navigate(['../bill/new', { groupId: this.group.id }], { relativeTo: this.route});
    }
}