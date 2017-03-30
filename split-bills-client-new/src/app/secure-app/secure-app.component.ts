import { Component } from '@angular/core';

import { User } from '../common/models/user';

import { HelpersService } from '../common/services/helpers.service';

@Component({
    templateUrl: './secure-app.component.html'
})
export class SecureAppComponent {
    user: User;

    constructor(private helpers: HelpersService) {
        this.user = this.helpers.getUserFromStorage();
    }
}
