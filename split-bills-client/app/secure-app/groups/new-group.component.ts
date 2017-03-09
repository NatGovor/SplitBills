import { Component, OnInit }         from '@angular/core';
import { Router, ActivatedRoute }    from '@angular/router';

import { Group }  from './group';
import { Friend } from '../friends/friend';
import { User }   from '../../user';

import { GroupService }   from './group.service';
import { HelpersService } from '../../helpers.service';
import { DialogService }  from '../../dialog.service';
import { FriendService }    from '../friends/friend.service';

import { Subject }           from 'rxjs/Subject';
import { Observable }        from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

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
                                    [(ngModel)]="friend.name" name="friendName{{i}}" (keyup)="search($event, i)">
                                <div *ngFor="let friend of friends[i] | async"
                                    class="search-result">
                                    <div (click)="chooseFriend(friend, i)">{{friend.name}}</div>
                                </div>
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
    `,
    styles: [`
        .search-result {
            border-bottom: 1px solid #ccc;
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
            padding: 5px;
            background-color: white;
            cursor: pointer;
        }
    `]
})
export class NewGroupComponent implements OnInit {
    submitted = false;
    owner = this.helpers.getStorageProperty("user") as User;
    model = new Group(0, '', 
    [
        new Friend(this.owner.name, this.owner.id, this.owner.email),
        new Friend('', 0),
        new Friend('', 0),
        new Friend('', 0)
    ]);
    friends = [
        Observable.of<Friend[]>([]),
        Observable.of<Friend[]>([]),
        Observable.of<Friend[]>([]),
        Observable.of<Friend[]>([])
    ];

    private searchTerms = [
        new Subject<string>(),
        new Subject<string>(),
        new Subject<string>(),
        new Subject<string>()
    ];

    constructor(
        private groupService: GroupService,
        private router: Router,
        private route: ActivatedRoute,
        private helpers: HelpersService,
        private dialogService: DialogService,
        private friendService: FriendService) {}

    search(event, i): void {
        this.searchTerms[i].next(event.target.value);
    }

    ngOnInit(): void {
        // to organize dynamic search of friends
       for (let i=0; i< this.friends.length; i++) {
            this.friends[i] = this.subscribeOnChanges(this.searchTerms[i]);
        };
    }

    subscribeOnChanges(searchTerms): Observable<Friend[]> {
        return searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term => {
                return term
                ? this.friendService.search(this.owner.id, term)
                : Observable.of<Friend[]>([])
            })
            .catch(error => {
                console.log(error);
                return Observable.of<Friend[]>([]);
            });
    }

    onSubmit(): void {
        this.submitted = true;

        this.model.friends = this.model.friends.filter(friend => friend.name != "");

        this.groupService.create(this.model)
            .then(group => {
                this.dialogService.alert('In real app (with server) new friends with emails will receive invite to register. But not here... not now...');
                this.router.navigate(['../'], { relativeTo: this.route });
            });
    }

    canDeactivate(): Promise<boolean> | boolean {
        if (this.submitted) {
            return true;
        }

        return this.dialogService.confirm('Discard creating new group?')
    }

    addPerson(): void {
        this.model.friends.push(new Friend('', 0));
        
        // to organize dynamic search of friends
        let newFriends = Observable.of<Friend[]>([]);
        let newSearchTerms = new Subject<string>()
        newFriends = this.subscribeOnChanges(newSearchTerms);
        this.searchTerms.push(newSearchTerms);
        this.friends.push(newFriends);
    }

    chooseFriend(friend, i): void {
        this.model.friends[i] = friend;
    }

    goBack(): void {
        this.router.navigate(['../'], { relativeTo: this.route });
    }
}