import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../../../common/models/user';
import { Friend } from '../../../common/models/friend';

import { UserService } from '../../../common/services/user.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FriendService {
    private usersUrl = 'app/users'; // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http, private userService: UserService) { }

    getAllForUser(userId: number): Promise<Friend[]> {
        return this.http.get(this.usersUrl)
                    .toPromise()
                    .then((response) => response.json().data as User[])
                    .then ((users) => users.find((user) => user.id === userId))
                    .then ((user) => user.friends)
                    .catch(this.handleError);
    }

    searchForUser(userId: number, term: string): Observable<Friend[]> {
        return this.http
                    .get(this.usersUrl + `/?name=${term}`)
                    .map((response) => response.json().data.filter((f) => f.id !== userId) as Friend[]);
    }

    createForUser(userId: number, potentialFriends: Friend[]): Promise<User> {
        return Promise.resolve(this.getAllForUser(userId)
            .then((friends) => {
                const userFriendsIds = friends.map((f) => f.userId);
                return potentialFriends.filter((friend) => userId !== friend.userId && !userFriendsIds.includes(friend.userId));
            })
            .then((newFriends) => this.userService.get(userId)
                .then((user) => {
                    user.friends = user.friends.concat(newFriends);
                    return this.userService.update(user);
                })));
    }

    update(friend: Friend): Promise<Friend> {
        const url = `${this.usersUrl}/${friend.userId}`;
        return this.http
            .put(url, JSON.stringify({
                id: friend.userId,
                name: friend.name,
                email: friend.email}),
                {headers: this.headers})
            .toPromise()
            .then(() => friend)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
