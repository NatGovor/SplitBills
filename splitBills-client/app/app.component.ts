import { Component, OnInit } from '@angular/core';

import { User } from './user';
import { UserService } from './user.service';
import { Group } from './group';
import { GroupService } from './group.service';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <div *ngIf="currentUser">
            <account [user]="currentUser"></account>
            <friends [friends]="currentUser.friends"></friends>
            <groups [groups]="groups"></groups>
        </div>
    `
})
export class AppComponent implements OnInit { 
    title = "My Split bills";
    currentUser: User;
    groups: Group[];
    
    constructor(
        private userService: UserService,
        private groupService: GroupService) {}

    getUser(id: number): void {
        this.userService.getUser(id).then(user => this.currentUser = user);
    }

    getUserGroups(id: number): void {
        this.groupService.getUserGroups(id).then(groups => this.groups = groups);
    }

    ngOnInit(): void {
        let id = 1;
        this.getUser(id);
        this.getUserGroups(id);
    }
}