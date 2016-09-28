import { Component, Input } from '@angular/core';

import { User } from './user';

@Component({
    selector: 'account',
    templateUrl: 'app/account.component.html'
})
export class AccountComponent {
    @Input()
    user: User;
}