import { Component }                 from '@angular/core';
import { Router, ActivatedRoute }    from '@angular/router';

import { Group }  from './group';
import { Friend } from '../friends/friend';

import { GroupService } from './group.service';

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

                <button type="submit" class="btn btn-default" [disabled]="!groupForm.form.valid">Submit</button>
            </form>
        </div>
    `
})
export class NewGroupComponent {

    model = new Group(0, '', []);

    constructor(
        private service: GroupService,
        private router: Router,
        private route: ActivatedRoute) {}

    onSubmit() {
        let owner = JSON.parse(localStorage.getItem('user'));

        this.model.friends.push(
            new Friend(owner.name, owner.id)
        );

        this.service.create(this.model)
            .then(group => {
                this.router.navigate(['../'], { relativeTo: this.route });
            });
    } 
}