import { Component, OnInit } from '@angular/core';

import { Group } from './group';

import { GroupService } from './group.service';

@Component({
    template: `
        <h2>Groups:</h2>
        <ul class="items">
            <li *ngFor="let group of groups">
                <span class="badge">{{group.id}}</span>
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