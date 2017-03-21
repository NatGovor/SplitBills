import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, 
         Router, Params }    from '@angular/router';

import { Group } from '../models/group';
import { User }  from '../../../shared-app/models/user';

import { GroupService }   from '../services/group.service';
import { HelpersService } from '../../../shared-app/services/helpers.service';

@Component({
    templateUrl: './app/secure-app/groups/components/groups.component.html' 
})
export class GroupsComponent implements OnInit {
    groups: Group[];

    constructor(
        private groupService: GroupService,
        private router: Router,
        private route: ActivatedRoute,
        private helpers: HelpersService) {}

    ngOnInit(): void {
        this.groupService.getUserGroups(this.helpers.getUserFromStorage().id)
            .then(groups => this.groups = groups);
    }

    gotoDetail(group: Group): void {
        this.router.navigate([group.id], { relativeTo: this.route});
    }

    addNew(): void {
        this.router.navigate(['new'], { relativeTo: this.route});
    }
}