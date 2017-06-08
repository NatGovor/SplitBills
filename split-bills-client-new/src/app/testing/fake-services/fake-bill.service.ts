export { Bill } from '../../common/models/bill';
export { BILLS } from '../fake-data/fake-bills';

import { Bill } from '../../common/models/bill';
import { BILLS } from '../fake-data/fake-bills';

export class FakeBillService {
    bills = BILLS.map(b => {
        return new Bill(b.id, b.description, b.amount, b.groupId, b.paidBy, b.splitType, b.debtors);
    });
    lastPromise: Promise<any>; // remember so we can spy on promise calls

    getAllForGroup(groupId: number) {
        return this.lastPromise = Promise.resolve<Bill[]>(this.bills.filter(b => b.groupId === groupId));
    }
}
