import { Component }                 from '@angular/core';
import { Router, ActivatedRoute }    from '@angular/router';

import { Group }  from './group';
import { Friend } from '../friends/friend';
import { User }   from '../../user';

import { GroupService } from './group.service';
import { Helpers }      from '../../helpers';

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
export class NewGroupComponent {

    owner = this.helpers.getStorageProperty("user") as User;

    model = new Group(0, '', 
    [
        new Friend(this.owner.name, this.owner.id),
        new Friend(''),
        new Friend(''),
        new Friend('')
    ]);

    constructor(
        private service: GroupService,
        private router: Router,
        private route: ActivatedRoute,
        private helpers: Helpers) {}

    onSubmit() {
        this.model.friends = this.model.friends.filter(friend => friend.name != "");

        this.service.create(this.model)
            .then(group => {
                this.router.navigate(['../'], { relativeTo: this.route });
            });
    }

    addPerson() {
        this.model.friends.push(new Friend(''));
    }

    goBack() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }
}