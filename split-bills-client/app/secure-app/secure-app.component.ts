import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../shared-app/models/user';

import { HelpersService } from '../shared-app/services/helpers.service';

@Component({
    template: `
        <h4>Hello, {{user.name}}!</h4>
        <nav>
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            <a routerLink="/profile" routerLinkActive="active">Profile</a>
            <a routerLink="/friends" routerLinkActive="active">Friends</a>
            <a routerLink="/groups" routerLinkActive="active">Groups</a>
        </nav>
        <router-outlet></router-outlet>
    `
})
export class SecureAppComponent {
    user: User;

    constructor(private helpers: HelpersService) {
        this.user = this.helpers.getUserFromStorage();
    }
}
