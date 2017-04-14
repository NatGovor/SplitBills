import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Bill } from '../../../common/models/bill';

@Injectable()
export class BillService {
    private billsUrl = 'app/bills'; // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getAllForGroup(groupId: number): Promise<Bill[]> {
        return this.http.get(this.billsUrl)
                    .toPromise()
                    .then((response) => response.json().data as Bill[])
                    .then((bills) => bills.filter((bill) => bill.groupId === groupId))
                    .catch(this.handleError);
    }

    create(bill: Bill): Promise<Bill> {
        return this.http
                .post(this.billsUrl,
                      JSON.stringify({
                          description: bill.description,
                          amount: bill.amount,
                          groupId: bill.groupId,
                          paidBy: bill.paidBy,
                          splitType: bill.splitType,
                          debtors: bill.debtors}),
                      {headers: this.headers})
                .toPromise()
                .then((res) => res.json().data)
                .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
