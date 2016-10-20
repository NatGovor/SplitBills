import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Group } from './group';
import { GroupService } from './group.service';
import { User } from '../user';

@Component({
    selector: 'groups',
    templateUrl: 'app/groups/groups.component.html'
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

    add(): void {
        this.router.navigate(['/groups/new', this.currentUser.id]);
    }
}