import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Group } from './group';

@Component({
    selector: 'groups',
    templateUrl: 'app/groups.component.html'
})
export class GroupsComponent {
    @Input()
    groups: Group[];
    selectedGroup: Group;

    constructor(
        private router: Router
    ) {}

    onSelect(group: Group): void {
        this.selectedGroup = group;
    }

    gotoDetail(): void {
        this.router.navigate(['/groups', this.selectedGroup.id]);
    }
}