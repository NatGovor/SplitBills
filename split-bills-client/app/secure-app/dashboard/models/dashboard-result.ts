import { Balance } from '../../groups/models/balance';
import { Group } from '../../groups/models/group';

export class DashboardResult {
    constructor(
        public unsettledGroups: Group[],
        public totalUserBalances: Balance[]
    ) {}
}
