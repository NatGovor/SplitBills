import { Bill } from '../../common/models/bill';
import { SplitType } from '../../common/enums/split-type';
import { Debtor } from '../../common/models/debtor';

export let BILLS: Bill[] = [
    // Bills for Group Number 21
    new Bill(1, 'Test Hotel', 84, 21, 11, SplitType.Equal, [
        new Debtor(11, 28),
        new Debtor(12, 28),
        new Debtor(16, 28)
    ]),
    new Bill(2, 'Dinner', 75, 21, 12, SplitType.ExactAmounts, [
        new Debtor(11, 20),
        new Debtor(12, 27),
        new Debtor(16, 28)
    ]),
    new Bill(3, 'Museum 1', 15, 21, 16, SplitType.Equal, [
        new Debtor(11, 5),
        new Debtor(12, 5),
        new Debtor(16, 5)
    ]),
    new Bill(4, 'Museum 2', 20, 21, 12, SplitType.ExactAmounts, [
        new Debtor(11, 0),
        new Debtor(12, 10),
        new Debtor(16, 10)
    ]),
    // Bills for Group Number 22
    new Bill(5, 'Test Hotel', 50, 22, 12, SplitType.Equal, [
        new Debtor(11, 25),
        new Debtor(12, 25)
    ]),
    new Bill(6, 'Payment', 75, 22, 11, SplitType.Payment, [
        new Debtor(12, 25)
    ])
];
