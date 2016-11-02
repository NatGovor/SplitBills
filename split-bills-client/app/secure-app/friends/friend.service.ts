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

    addFriends(userId: number, friends: Friend[]): Promise<any> {
        this.userService.getUser(userId)
            .then(user => {
                friends.forEach(friend => {
                    let exist = false;
                    user.friends.forEach(userFriend => {
                        if (userFriend.userId === friend.userId) {
                           exist = true; 
                        }
                    });

                    if (!exist) {
                        user.friends.push(friend);
                    }
                });
                
                return user;
            })
            .then(user => {
                if (user.id) {
                    this.userService.update(user);
                }
            })
            .catch(this.handleError);
        return null;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}