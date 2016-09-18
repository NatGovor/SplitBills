import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Group } from './models/group';
import { GroupService } from './services/group.service';
import { User } from './models/user';

@Component({
    selector: 'groups',
    templateUrl: 'app/groups.component.html'
})
export class GroupsComponent {
    @Input() groups: Group[];
    @Input() currentUser: User;
    selectedGroup: Group;

    constructor(
        private router: Router,
        private groupService: GroupService
    ) {}

    onSelect(group: Group): void {
        this.selectedGroup = group;
    }

    gotoDetail(): void {
        this.router.navigate(['/groups', this.selectedGroup.id]);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        
        let newGroup: Group = {
            id: null,
            name: name,
            friends: [
                {
                    userId: this.currentUser.id,
                    name: this.currentUser.name
                }
            ]
        };
        this.groupService.create(newGroup)
            .then(group => {
                this.groups.push(group);
                this.selectedGroup = null;
            });
    }
}