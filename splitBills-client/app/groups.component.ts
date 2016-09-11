import { Component, Input } from '@angular/core';

import { Group } from './group';

@Component({
    selector: 'groups',
    templateUrl: 'app/groups.component.html'
})
export class GroupsComponent {
    @Input()
    groups: Group[];
}