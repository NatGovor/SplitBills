import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Friend } from '../models/friend';
import { User } from '../../../shared-app/models/user';

import { UserService } from '../../../shared-app/services/user.service';

@Component({
    templateUrl: './app/secure-app/friends/components/friend-detail.component.html' 
})
export class FriendDetailComponent implements OnInit {
    friend: Friend;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router) {}

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.userService.getUser(id).then(user => this.friend = new Friend(user.name, user.id, user.email));
        });
    }

    goBack(): void {
        window.history.back();
    }

    editFriendInfo(): void {
        this.router.navigate(['friends', this.friend.userId, 'edit']);
    }
}