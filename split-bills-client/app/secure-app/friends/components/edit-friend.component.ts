import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { User } from '../../../shared-app/models/user';
import { Friend } from '../models/friend';

import { HistoryService } from '../../../shared-app/services/history.service';
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
        private route: ActivatedRoute,
        private historyService: HistoryService) {}

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            const id = +params['id'];
            this.userService.getUser(id).then((user) => this.friend = new Friend(user.name, user.id, user.email));
        });
    }

    onSubmit(): void {
        this.friendService.update(this.friend).then((friend) => {
            this.historyService.back();
        });
    }

    cancel(): void {
        this.historyService.back();
    }
}
