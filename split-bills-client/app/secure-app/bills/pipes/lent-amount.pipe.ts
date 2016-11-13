import { Pipe, PipeTransform } from '@angular/core';

import { Debtor } from '../debtor';
import { User }   from '../../../user';

import { HelpersService } from '../../../helpers.service';

@Pipe({name: 'lentAmount'})
export class LentAmountPipe implements PipeTransform {
    currentUser: User;

    constructor(private helpers: HelpersService) {
        this.currentUser = this.helpers.getStorageProperty("user") as User;
    }

    transform(payerId: number, debtors: Debtor[]): number {
        let self = this;

        let calculateDebt = function (sum, debtor) {
            if (debtor.userId === self.currentUser.id) {
                return sum + debtor.amount;
            }
            return sum;
        };

        let calculateCredit = function (sum, debtor) {
            if ( debtor.userId != self.currentUser.id) {
                return sum + debtor.amount;
            }
            return sum;
        };

        return debtors.reduce(payerId === this.currentUser.id ? calculateCredit : calculateDebt, 0);
    }
}