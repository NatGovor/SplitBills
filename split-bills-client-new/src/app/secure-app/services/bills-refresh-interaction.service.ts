import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Bill } from '../bills/models/bill';

@Injectable()
export class BillsRefreshInteraction {
    private billAddedSource = new Subject<Bill>();
    private billRefreshedSource = new Subject<Bill>();

    billAdded$ = this.billAddedSource.asObservable();
    billRefreshed$ = this.billRefreshedSource.asObservable();

    addBill(bill: Bill): void {
        this.billAddedSource.next(bill);
    }

    refreshBills(bill: Bill): void {
        this.billRefreshedSource.next(bill);
    }
}
