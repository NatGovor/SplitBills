import { Balance } from '../../../common/models/balance';
import { Group } from '../../../common/models/group';

export class DashboardResult {
    unsettledGroups: Group[];
    totalUserBalances: Balance[];

    constructor(unsettledGroups: Group[], totalUserBalances: Balance[]) {
        this.unsettledGroups = unsettledGroups;
        this.totalUserBalances = totalUserBalances;
    }
}
