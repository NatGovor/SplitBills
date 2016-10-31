import { Component, OnInit } from '@angular/core';

import { Friend } from './friend';

import { FriendService } from './friend.service';

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

    constructor(private service: FriendService) {}

    ngOnInit() {
        this.service.getFriends(JSON.parse(localStorage.getItem('user')).id)
            .then(friends => this.friends = friends);
    }
}