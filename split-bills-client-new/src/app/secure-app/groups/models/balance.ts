import { Friend } from '../../../common/models/friend';

export class Balance {
    constructor(public friend: Friend, public amount: number) {}
}
