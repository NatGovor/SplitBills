import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Friend } from './friend';
import { User }   from '../../shared-app/models/user';

import { UserService }  from '../../shared-app/services/user.service';
import { FriendService } from './friend.service';

@Component({
    template: `
        <div class="col-sm-4" *ngIf="friend">
            <h2>Edit friend info</h2>
            <form (ngSubmit)="onSubmit()" #groupForm="ngForm">
                <div class="form-group">
                    <label for="name">Email address</label>
                    <input type="text" class="form-control" id="email" 
                        required
                        [(ngModel)]="friend.email" name="email">
                </div>
                
                <button (click)="cancel()">Cancel</button>
                <button [disabled]="!groupForm.form.valid">Save changes</button>
            </form>
        </div>
    `
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