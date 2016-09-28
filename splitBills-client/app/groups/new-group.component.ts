import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

import { Group } from './group';
import { User } from './user';
import { GroupService } from './group.service';
import { UserService } from './user.service';

@Component({
    selector: 'new-group',
    templateUrl: 'app/new-group.component.html'
})
export class NewGroupComponent implements OnInit {
    user: User;

    constructor(
        private groupService: GroupService,
        private userService: UserService,
        private activatedRouter: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {
        this.activatedRouter.params.forEach((params: Params) => {
            let id = +params['userId'];
            this.userService.getUser(id).then(user => this.user = user);
        });
    }
        

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        
        let newGroup: Group = {
            id: null,
            name: name,
            friends: [
                {
                    userId: this.user.id,
                    name: this.user.name
                }
            ]
        };
        this.groupService.create(newGroup)
            .then(group => {
                this.router.navigate(['/dashboard']);
            });
    }
}