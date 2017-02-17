import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Friend } from './friend';
import { User }   from '../../user';

import { UserService } from '../../user.service'; 

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class FriendService {
    private usersUrl = 'app/users'; // URL to web api

    constructor(private http: Http, private userService: UserService) { }

    getFriends(userId: number): Promise<Friend[]> {
        return this.http.get(this.usersUrl)
                    .toPromise()
                    .then(response => response.json().data as User[])
                    .then (users => users.find(user => user.id === userId))
                    .then (user => user.friends)
                    .catch(this.handleError);
    }

    search(userId: number, term: string): Observable<Friend[]> {
        return this.http
                    .get(this.usersUrl + `/?name=${term}`)
                    .map(response => response.json().data as Friend[]);
    }

    addFriends(userId: number, potentialFriends: Friend[]): Promise<User> {
        return Promise.resolve(this.getFriends(userId)
            .then(friends => {
                let userFriendsIds = friends.map(f => f.userId);
                return potentialFriends.filter(friend => userId !== friend.userId && !userFriendsIds.includes(friend.userId));
            })
            .then(newFriends => this.userService.getUser(userId)
                .then(user => {
                    user.friends = user.friends.concat(newFriends);
                    return this.userService.update(user);
                })));
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}