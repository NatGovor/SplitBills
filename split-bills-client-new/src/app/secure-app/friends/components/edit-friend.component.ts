import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Friend } from '../../../common/models/friend';

import { UserService } from '../../../common/services/user.service';
import { FriendService } from '../services/friend.service';
import { HistoryService } from '../../../common/services/history.service';

@Component({
    templateUrl: './edit-friend.component.html'
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
