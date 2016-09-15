import { Component, OnInit } from '@angular/core';

import { User } from './models/user';
import { Group } from './models/group';
import { UserService } from './services/user.service';
import { GroupService } from './services/group.service';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard.component.html'
})
export class DashboardComponent {
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