import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Group } from './group';
import { GroupService } from './group.service';

@Component({
    selector: 'group-detail',
    templateUrl: 'app/group-detail.component.html'
})
export class GroupDetailComponent implements OnInit {
    group: Group;

    constructor(
        private groupService: GroupService,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.groupService.getGroup(id).then(group => this.group = group);
        })
    }

    goBack(): void {
        window.history.back();
    }
}