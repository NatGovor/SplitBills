import { Pipe, PipeTransform } from '@angular/core';

import { Friend } from '../../secure-app/friends/models/friend';
import { User } from '../models/user';

import { HelpersService } from '../services/helpers.service';

@Pipe({name: 'paidByName'})
export class PaidByPipe implements PipeTransform {
    currentUser: User;

    constructor(private helpers: HelpersService) {
        this.currentUser = this.helpers.getUserFromStorage();
    }

    transform(payerId: number, friends: Friend[], additionalText: boolean): string {
        let payer = friends.find(f => f.userId === payerId);
        if (!additionalText) {
            return payer.userId === this.currentUser.id ? 'you' : payer.name;
        } else {
            return payer.userId === this.currentUser.id ? 'you lent' : payer.name + ' lent you';
        }
    }
}