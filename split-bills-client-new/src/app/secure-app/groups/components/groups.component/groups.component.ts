import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Group } from '../../../../common/models/group';

import { HelpersService } from '../../../../common/services/helpers.service';
import { GroupService } from '../../services/group.service';

@Component({
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
    groups: Group[];

    constructor(
        private groupService: GroupService,
        private router: Router,
        private route: ActivatedRoute,
        private helpers: HelpersService) {}

    ngOnInit(): void {
        this.groupService.getForUser(this.helpers.getUserFromStorage().id)
            .then((groups) => this.groups = groups);
    }

    gotoDetail(group: Group): void {
        this.router.navigate([group.id], { relativeTo: this.route});
    }

    addNew(): void {
        this.router.navigate(['new'], { relativeTo: this.route});
    }
}
