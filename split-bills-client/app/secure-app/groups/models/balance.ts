import { Friend } from '../../friends/models/friend';

export class Balance {
    constructor(public friend: Friend, public amount: number) {}
}