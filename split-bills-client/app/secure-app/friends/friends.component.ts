import { Component, OnInit } from '@angular/core';

import { Friend } from './friend';
import { User }   from '../../user';

import { FriendService } from './friend.service';
import { Helpers }       from '../../helpers';

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
        private service: FriendService,
        private helpers: Helpers) {}

    ngOnInit() {
        this.service.getFriends((this.helpers.getStorageProperty("user") as User).id)
            .then(friends => this.friends = friends);
    }
}