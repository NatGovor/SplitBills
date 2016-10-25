import { Component, OnInit } from '@angular/core';

import { Group } from './group';

import { GroupService } from './group.service';

@Component({
    template: `
        <p>Groups:</p>
        <ul>
            <li *ngFor="let group of groups"
                (click)="onSelect(group); gotoDetail();">
                <span>{{group.id}}</span>
                {{group.name}}
            </li>
        </ul>
    `
})
export class GroupsComponent implements OnInit {
    groups: Group[];

    constructor(private service: GroupService) {}

    ngOnInit() {
        this.service.getUserGroups(localStorage.getItem("userEmail"))
            .then(groups => this.groups = groups);
    }
}