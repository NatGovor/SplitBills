import { Component, OnInit } from '@angular/core';

import { Friend } from './friend';

import { FriendService } from './friend.service';

@Component({
    template: `
        <p>Friends: </p>
        <ul>
            <li *ngFor="let friend of friends">
                <span>{{friend.id}}</span>
                {{friend.name}}
            </li>
        </ul>
    `
})
export class FriendsComponent implements OnInit {
    friends: Friend[];

    constructor(private service: FriendService) {}

    ngOnInit() {
        this.service.getFriends(localStorage.getItem('userEmail'))
            .then(friends => this.friends = friends);
    }
}