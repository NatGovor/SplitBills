import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Friend } from '../models/friend';
import { User } from '../../../shared-app/models/user';

import { UserService } from '../../../shared-app/services/user.service';
import { FriendService } from '../services/friend.service';

@Component({
    templateUrl: './app/secure-app/friends/components/edit-friend.component.html' 
})
export class EditFriendComponent implements OnInit {
    friend: Friend;

    constructor(
        private userService: UserService,
        private friendService: FriendService,
        private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.userService.getUser(id).then(user => this.friend = new Friend(user.name, user.id, user.email));
        });
    }

    onSubmit(): void {
        this.friendService.update(this.friend).then(friend => {
            window.history.back();
        });
    }

    cancel(): void {
        window.history.back();
    }
}