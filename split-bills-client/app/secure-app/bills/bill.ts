export class Bill {
    constructor(
        public id: number,
        public description: string,
        public amount: number,
        public paidBy: number,
        public splitType: SplitType
    ) {}
}

export enum SplitType {
    Equal
}