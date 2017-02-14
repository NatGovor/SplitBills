import { Balance } from '../groups/balance';
import { Group } from '../groups/group';

export class DashboardResult {
    constructor(
        public unsettledGroups: Group[],
        public totalUserBalances: Balance[]
    ) {}
}