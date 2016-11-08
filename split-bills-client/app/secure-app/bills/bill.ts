import { SplitType } from './split-type';
import { Debtor }    from './debtor';

export class Bill {
    constructor(
        public id: number,
        public description: string,
        public amount: number,
        public groupId: number,
        public paidBy: number,
        public splitType: SplitType,
        public debtors: Debtor[]
    ) {}
}