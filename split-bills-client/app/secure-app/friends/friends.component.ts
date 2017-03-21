import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, 
         Router, Params }    from '@angular/router';

import { Friend } from './friend';
import { User }   from '../../shared-app/models/user';

import { FriendService }  from './friend.service';
import { HelpersService } from '../../shared-app/services/helpers.service';

@Component({
    template: `
        <h2>Friends: </h2>
        <ul class="items">
            <li *ngFor="let friend of friends" (click)="gotoDetail(friend)">
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
        private helpers: HelpersService,
        private router: Router,
        private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.friendService.getFriends(this.helpers.getUserFromStorage().id)
            .then(friends => this.friends = friends);
    }

    gotoDetail(friend: Friend): void {
        this.router.navigate([friend.userId], { relativeTo: this.route});
    }
}