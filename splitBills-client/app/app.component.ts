import { Component, OnInit } from '@angular/core';

import { User } from './user';
import { UserService } from './user.service';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <div *ngIf="currentUser">
            <account [user]="currentUser"></account>
            <friends [friends]="currentUser.friends"></friends>
        </div>
    `,
    providers: [ UserService ]
})
export class AppComponent implements OnInit { 
    title = "My Split bills";
    //users: User[];
    currentUser: User;
    
    constructor(private userService: UserService) {}

    /*getUsers(): void {
        this.userService.getUsers().then(users => this.users = users);
    }*/

    getUser(id: number): void {
        this.userService.getUser(id).then(user => this.currentUser = user);
    }

    ngOnInit(): void {
        this.getUser(1);
    }
}