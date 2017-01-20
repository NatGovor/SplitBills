import { Component, OnInit }         from '@angular/core';
import { Router, ActivatedRoute }    from '@angular/router';

import { Group }  from './group';
import { Friend } from '../friends/friend';
import { User }   from '../../user';

import { GroupService }   from './group.service';
import { HelpersService } from '../../helpers.service';
import { DialogService }  from '../../dialog.service';
import { FriendService }    from '../friends/friend.service';

@Component({
    template: `
        <div class="col-sm-4">
            <h2>Start a new group</h2>
            <form (ngSubmit)="onSubmit()" #groupForm="ngForm">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" 
                        required
                        [(ngModel)]="model.name" name="name">
                </div>

                <div>
                    <label>Group Members</label>
                    <div *ngFor="let friend of model.friends; let i = index" class="form-group">
                        <div *ngIf="i == 0" class="form-group">{{ friend.name }}</div>
                        <div *ngIf="i > 0" class="row">
                            <div class="col-xs-6">
                                <input type="text" class="form-control" placeholder="Friend name"
                                    [(ngModel)]="friend.name" name="friendName{{i}}">
                            </div>
                            <div class="col-xs-6">
                                <input *ngIf="friend.userId !== owner.id" type="email" class="form-control col-xs-6" placeholder="Email address (optional)"
                                    [(ngModel)]="friend.email" name="friendEmail{{i}}">
                            </div>
                        </div>
                    </div>
                    <button (click)="addPerson()" type="button" class="btn btn-sm">Add a person</button>
                </div>
                
                <br/>
                <button type="submit" class="btn btn-default" [disabled]="!groupForm.form.valid">Submit</button>
                <button (click)="goBack()" type="button" class="btn btn-default">Back</button>
            </form>
        </div>
    `
})
export class NewGroupComponent implements OnInit {
    submitted = false;
    currentUserFriends: Friend[];
    owner = this.helpers.getStorageProperty("user") as User;
    model = new Group(0, '', 
    [
        new Friend(this.owner.name, this.owner.id, this.owner.email),
        new Friend('', 0),
        new Friend('', 0),
        new Friend('', 0)
    ]);

    constructor(
        private groupService: GroupService,
        private router: Router,
        private route: ActivatedRoute,
        private helpers: HelpersService,
        private dialogService: DialogService,
        private friendService: FriendService) {}

    ngOnInit() {
        this.friendService.getFriends(this.owner.id)
            .then(friends => this.currentUserFriends = friends);
    }

    onSubmit() {
        this.submitted = true;

        this.model.friends = this.model.friends.filter(friend => friend.name != "");

        // find friends that are associated with users
        this.model.friends.forEach(friend => {
            let existFriend = this.currentUserFriends.find(f => f.name == friend.name);
            if (existFriend) {
                friend.userId = existFriend.userId;
            }
        });

        this.groupService.create(this.model)
            .then(group => {
                this.dialogService.alert('In real app (with server) friends with emails will receive invite to register. But not here... not now...');
                this.router.navigate(['../'], { relativeTo: this.route });
            });
    }

    canDeactivate(): Promise<boolean> | boolean {
        if (this.submitted) {
            return true;
        }

        return this.dialogService.confirm('Discard creating new group?')
    }

    addPerson() {
        this.model.friends.push(new Friend('', 0));
    }

    goBack() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }
}