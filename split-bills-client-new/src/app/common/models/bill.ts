import { Debtor } from './debtor';
import { SplitType } from '../enums/split-type';

export class Bill {
    id: number;
    description: string;
    amount: number;
    groupId: number;
    paidBy: number;
    splitType: SplitType;
    debtors: Debtor[];

    constructor(id: number, description: string, amount: number, groupId: number,
        paidBy: number, splitType: SplitType, debtors: Debtor[]) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.groupId = groupId;
        this.paidBy = paidBy;
        this.splitType = splitType;
        this.debtors = debtors;
    }
}
