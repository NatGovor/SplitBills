import { Friend } from './friend';

export class Balance {
    friend: Friend;
    amount: number;

    constructor(friend: Friend, amount: number) {
        this.friend = friend;
        this.amount = amount;
    }
}
