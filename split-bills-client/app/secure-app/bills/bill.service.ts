import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Bill } from './bill';

@Injectable()
export class BillService {
    private billsUrl = 'app/bills'; // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getBills(groupId: number): Promise<Bill[]> {
        return this.http.get(this.billsUrl)
                    .toPromise()
                    .then(response => response.json().data as Bill[])
                    .then(bills => bills.filter(bill => bill.groupId === groupId))
                    .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}