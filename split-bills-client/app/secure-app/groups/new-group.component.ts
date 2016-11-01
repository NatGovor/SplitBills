import { Component, OnInit }         from '@angular/core';
import { Router, ActivatedRoute }    from '@angular/router';

import { Group }  from './group';
import { Friend } from '../friends/friend';
import { User }   from '../../user';

import { GroupService }   from './group.service';
import { HelpersService } from '../../helpers.service';
import { DialogService }  from '../../dialog.service';
import { UserService }    from '../../user.service';

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
                        <input *ngIf="i > 0" type="text" class="form-control" placeholder="Friend name"
                            [(ngModel)]="friend.name" name="friendName{{i}}">
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
    currentUser: User;
    owner = this.helpers.getStorageProperty("user") as User;
    model = new Group(0, '', 
    [
        new Friend(this.owner.name, this.owner.id),
        new Friend(''),
        new Friend(''),
        new Friend('')
    ]);

    constructor(
        private groupService: GroupService,
        private router: Router,
        private route: ActivatedRoute,
        private helpers: HelpersService,
        private dialogService: DialogService,
        private userService: UserService) {}

    ngOnInit() {
        this.userService.getUser(this.owner.id)
            .then(user => this.currentUser = user);
    }

    onSubmit() {
        this.submitted = true;

        this.model.friends = this.model.friends.filter(friend => friend.name != "");

        // find friends that are associated with users
        this.model.friends.forEach(friend => {
            let existFriend = this.currentUser.friends.find(f => f.name == friend.name);
            if (existFriend) {
                friend.userId = existFriend.userId;
            }
        });

        this.groupService.create(this.model)
            .then(group => {
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
        this.model.friends.push(new Friend(''));
    }

    goBack() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }
}