import { Component, OnInit } from '@angular/core';

import { User } from '../user';

import { UserService }    from '../user.service';
import { HelpersService } from '../helpers.service';

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

    ngOnInit() {
        this.userService.getUser((this.helpers.getStorageProperty("user") as User).id)
            .then(user => this.user = user);
    }
}