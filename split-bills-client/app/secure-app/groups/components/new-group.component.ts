import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Friend } from '../../friends/models/friend';
import { Group } from '../models/group';

import { DialogService } from '../../../shared-app/services/dialog.service';
import { HelpersService } from '../../../shared-app/services/helpers.service';
import { FriendService } from '../../friends/services/friend.service';
import { GroupService } from '../services/group.service';

// Observable class extensions
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
    templateUrl: './app/secure-app/groups/components/new-group.component.html',
    styleUrls: ['./app/secure-app/groups/components/new-group.component.css']
})
export class NewGroupComponent implements OnInit {
    submitted = false;
    owner = this.helpers.getUserFromStorage();
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
       for (let i = 0; i < this.friends.length; i++) {
            this.friends[i] = this.subscribeOnChanges(this.searchTerms[i]);
        }
    }

    subscribeOnChanges(searchTerms): Observable<Friend[]> {
        return searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap((term) => {
                return term
                ? this.friendService.search(this.owner.id, term)
                : Observable.of<Friend[]>([])
            })
            .catch((error) => {
                console.log(error); // for demo purposes only
                return Observable.of<Friend[]>([]);
            });
    }

    onSubmit(): void {
        this.submitted = true;

        this.model.friends = this.model.friends.filter((friend) => friend.name !== '');

        this.groupService.create(this.model)
            .then((group) => {
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
        const newSearchTerms = new Subject<string>();
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
