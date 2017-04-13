export class FriendDebtor {
    userId: number;
    name: string;
    isActive: boolean;
    amount: number;

    constructor(userId: number, name: string, isActive: boolean, amount: number) {
        this.userId = userId;
        this.name = name;
        this.isActive = isActive;
        this.amount = amount;
    }
}
