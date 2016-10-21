import { Component, Input } from '@angular/core';

import { User } from './user';

@Component({
    selector: 'account',
    templateUrl: 'app/users/account.component.html'
})
export class AccountComponent {
    @Input()
    user: User;
}