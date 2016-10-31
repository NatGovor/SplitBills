import { Component, OnInit } from '@angular/core';

import { User } from '../user';

import { UserService } from '../user.service';
import { Helpers }     from '../helpers';

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
        private service: UserService,
        private helpers: Helpers) {}

    ngOnInit() {
        this.service.getUser((this.helpers.getStorageProperty("user") as User).id)
            .then(user => this.user = user);
    }
}