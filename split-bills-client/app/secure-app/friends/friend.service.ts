import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Friend } from './friend';
import { User }  from '../../user';

import { UserService } from '../../user.service';

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

    addFriends(userId: number, friends: Friend[]): Promise<User> {
        return Promise.resolve(this.userService.getUser(userId)
            .then(user => {
                let userFriendsIds = user.friends.map(f => f.userId);
                friends.forEach(friend => {
                    if (user.id !== friend.userId && !userFriendsIds.includes(friend.userId)) {
                        user.friends.push(friend);
                    }
                });
                return user;
            })
            .then(user => this.userService.update(user)));
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}