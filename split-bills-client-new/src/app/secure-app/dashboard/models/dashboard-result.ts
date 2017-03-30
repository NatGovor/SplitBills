import { Balance } from '../../../common/models/balance';
import { Group } from '../../../common/models/group';

export class DashboardResult {
    constructor(
        public unsettledGroups: Group[],
        public totalUserBalances: Balance[]
    ) {}
}
