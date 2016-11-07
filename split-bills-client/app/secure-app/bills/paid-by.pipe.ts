import { Pipe, PipeTransform } from '@angular/core';

import { Friend } from '../friends/friend';
import { User }   from '../../user';

import { HelpersService } from '../../helpers.service';

@Pipe({name: 'paidByName'})
export class PaidByPipe implements PipeTransform {
    currentUser: User;

    constructor(private helpers: HelpersService) {
        this.currentUser = this.helpers.getStorageProperty("user") as User;
    }

    transform(payerId: number, friends: Friend[]): string {
        let payer = friends.find(f => f.userId === payerId);
        return payer.userId === this.currentUser.id ? 'you' : payer.name;
    }
}