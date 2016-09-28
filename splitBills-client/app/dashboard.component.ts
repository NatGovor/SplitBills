import { Component, OnInit } from '@angular/core';

import { User } from './user';
import { UserService } from './user.service';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard.component.html'
})
export class DashboardComponent {
    currentUser: User;
    
    constructor(
        private userService: UserService) {}

    getUser(id: number): void {
        this.userService.getUser(id).then(user => this.currentUser = user);
    }

    getUserGroups(id: number): void {
        //this.groupService.getUserGroups(id).then(groups => this.groups = groups);
    }

    ngOnInit(): void {
        let id = 1;
        this.getUser(id);
        this.getUserGroups(id);
    }
}