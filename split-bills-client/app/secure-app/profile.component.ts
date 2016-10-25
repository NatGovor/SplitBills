import { Component, OnInit } from '@angular/core';

import { User } from '../user';

import { UserService } from '../user.service';

@Component({
    template: `
        <p>Profile</p>
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

    constructor(private service: UserService) {}

    ngOnInit() {
        this.service.getUserByEmail(localStorage.getItem('userEmail')).then(user => this.user = user);
    }
}