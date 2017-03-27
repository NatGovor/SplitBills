import { Component, OnInit } from '@angular/core';

import { User } from '../../../shared-app/models/user';

import { HelpersService } from '../../../shared-app/services/helpers.service';
import { UserService } from '../../../shared-app/services/user.service';

@Component({
    template: `
        <h2>Profile</h2>
        <div *ngIf="user">
            <div>
                <span>id: </span>{{user.id}}
            </div>
            <div>
                <span>name: </span>{{user.name}}
            </div>
            <div>
                <span>email: </span>{{user.email}}
            </div>
        </div>
    `
})
export class ProfileComponent implements OnInit {
    user: User;

    constructor(
        private userService: UserService,
        private helpers: HelpersService) {}

    ngOnInit(): void {
        this.userService.getUser(this.helpers.getUserFromStorage().id)
            .then((user) => this.user = user);
    }
}
