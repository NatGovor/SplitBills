import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Group } from './models/group';
import { GroupService } from './services/group.service';

@Component({
    selector: 'groups',
    templateUrl: 'app/groups.component.html'
})
export class GroupsComponent {
    @Input()
    groups: Group[];
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
        this.groupService.create(name)
            .then(group => {
                this.groups.push(group);
                this.selectedGroup = null;
            });
    }
}