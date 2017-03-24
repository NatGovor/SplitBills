export class ClientBill {
    constructor(
        public id: number,
        public description: string,
        public amount: number,
        public paidByName: string
    ) {}
}
