import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, 
         Router, Params }    from '@angular/router';

import { Group } from './group';
import { User }  from '../../user';

import { GroupService }   from './group.service';
import { HelpersService } from '../../helpers.service';

@Component({
    template: `
        <h2>Groups:</h2>
        <button (click)="addNew();">Add new</button>
        <ul class="items">
            <li *ngFor="let group of groups"
                (click)="gotoDetail(group);">
                <span class="badge">{{group.id}}</span>
                {{group.name}}
            </li>
        </ul>
    `
})
export class GroupsComponent implements OnInit {
    groups: Group[];

    constructor(
        private groupService: GroupService,
        private router: Router,
        private route: ActivatedRoute,
        private helpers: HelpersService) {}

    ngOnInit() {
        this.groupService.getUserGroups((this.helpers.getStorageProperty("user") as User).id)
            .then(groups => this.groups = groups);
    }

    gotoDetail(group: Group): void {
        this.router.navigate([group.id], { relativeTo: this.route});
    }

    addNew() {
        this.router.navigate(['new'], { relativeTo: this.route});
    }
}