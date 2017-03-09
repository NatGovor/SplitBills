import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Friend } from './friend';
import { User }   from '../../user';

import { UserService }  from '../../user.service';

@Component({
    template: `
        <div *ngIf="friend">
            <h2>{{ friend.name }}</h2>
            <div *ngIf="friend.email">{{ friend.email }}</div>
            <div *ngIf="!friend.email" class="row">
                <div class="col-xs-8">No email address</div>
                <div class="col-xs-4">
                    <button (click)="editFriendInfo()" class="important-btn">Invite {{ friend.name }}</button>
                </div>
            </div>
            <button (click)="goBack()">Back</button>
        </div>
    `
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