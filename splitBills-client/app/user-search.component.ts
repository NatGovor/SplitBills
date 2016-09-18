import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { User } from './models/user';
import { UserSearchService } from './services/user-search.service';

@Component({
    selector: 'user-search',
    templateUrl: 'app/user-search.component.html',
    providers: [UserSearchService]
})
export class UserSearchComponent implements OnInit {
    users: Observable<User[]>;
    private searchTerms = new Subject<string>();

    constructor(
        private UserSearchService: UserSearchService
    ) {}

    // Push a search term into the observable stream
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.users = this.searchTerms
            .debounceTime(300) // wait for 300ms pause in events
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(term => term // switch to new observable each time
                // return the http search observable
                ? this.UserSearchService.search(term)
                // or the observable of empty users if no search term
                : Observable.of<User[]>([]))
            .catch(error => {
                // TODO: real error handling
                console.log(error);
                return Observable.of<User[]>([]);
            });
    }
}