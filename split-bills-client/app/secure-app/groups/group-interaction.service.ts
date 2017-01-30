import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Bill } from '../bills/bill';

@Injectable()
export class GroupInteraction {
    private billAddedSource = new Subject<Bill>();
    private billRefreshedSource = new Subject<Bill>();

    billAdded$ = this.billAddedSource.asObservable();
    billRefreshed$ = this.billRefreshedSource.asObservable();

    addBill(bill: Bill) {
        this.billAddedSource.next(bill);
    }

    refreshBills(bill: Bill) {
        this.billRefreshedSource.next(bill);
    }
}