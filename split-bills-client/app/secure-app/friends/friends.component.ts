import { Component, OnInit } from '@angular/core';

import { Friend } from './friend';
import { User }   from '../../user';

import { FriendService }  from './friend.service';
import { HelpersService } from '../../helpers.service';

@Component({
    template: `
        <h2>Friends: </h2>
        <ul class="items">
            <li *ngFor="let friend of friends">
                <span class="badge">{{friend.userId}}</span>
                {{friend.name}}
            </li>
        </ul>
    `
})
export class FriendsComponent implements OnInit {
    friends: Friend[];

    constructor(
        private friendService: FriendService,
        private helpers: HelpersService) {}

    ngOnInit() {
        this.friendService.getFriends((this.helpers.getStorageProperty("user") as User).id)
            .then(friends => this.friends = friends);
    }
}