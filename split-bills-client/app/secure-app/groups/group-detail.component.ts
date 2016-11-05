import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Group } from './group';

import { GroupService } from './group.service';

@Component({
    template: `
        <div *ngIf="group">
            <h4>{{group.name}} details</h4>
            <div>
                <div>
                    <span>id: </span>{{group.id}}
                </div>
                <div>
                    <span>name: </span>{{group.name}}
                </div>
                <div>
                    <span>Members: </span>
                    <ul>
                        <li *ngFor="let friend of group.friends">
                            {{friend.name}}
                        </li>
                    </ul>
                </div>
                <bills-list [group]="group"></bills-list>
                <button (click)="goBack()">Back</button>
            </div>
        </div>
    `
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
        });
    }

    goBack(): void {
        window.history.back();
    }
}