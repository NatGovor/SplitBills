import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Friend } from '../models/friend';

import { HelpersService } from '../../../shared-app/services/helpers.service';
import { FriendService } from '../services/friend.service';

@Component({
    templateUrl: './app/secure-app/friends/components/friends.component.html'
})
export class FriendsComponent implements OnInit {
    friends: Friend[];

    constructor(
        private friendService: FriendService,
        private helpers: HelpersService,
        private router: Router,
        private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.friendService.getFriends(this.helpers.getUserFromStorage().id)
            .then((friends) => this.friends = friends);
    }

    gotoDetail(friend: Friend): void {
        this.router.navigate([friend.userId], { relativeTo: this.route});
    }
}
