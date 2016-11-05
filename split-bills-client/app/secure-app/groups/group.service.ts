import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Group }  from './group';
import { User }   from '../../user';
import { Friend } from '../friends/friend';

import { UserService }   from '../../user.service';
import { FriendService } from '../friends/friend.service';

@Injectable()
export class GroupService {
    private groupsUrl = 'app/groups'; // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http, 
        private userService: UserService,
        private friendService: FriendService) { }

    getGroups(): Promise<Group[]> {
        return this.http.get(this.groupsUrl)
                    .toPromise()
                    .then(response => response.json().data as Group[])
                    .catch(this.handleError);
    }

    getUserGroups(userId: number): Promise<Group[]> {
        return this.getGroups().then(groups => groups.filter(
                    group => {
                        for (let i=0; i < group.friends.length; i++) {
                            if (group.friends[i].userId === userId) {
                                return true;
                            }
                        }
                    }));
    }

    getGroup(id: number): Promise<Group> {
        return this.getGroups()
            .then(groups => groups.find(group => group.id === id));
    }

    create(group: Group): Promise<Group> {
        let self = this;

        let createUserFromFriend = function (friend: Friend): Promise<Friend> {
            if (friend.userId) {
                return Promise.resolve(friend);
            }

            return Promise.resolve(
                self.userService.create(new User(0, friend.name, '', '', false, []))
                    .then(user => {
                        friend.userId = user.id;
                        return friend;
                    }));
        };      

        return Promise.all(group.friends.map(createUserFromFriend))
                    .then(friends => {
                        group.friends.forEach(friend => this.friendService.addFriends(friend.userId, group.friends));
                    })
                    .then(() => {
                        return this.http
                            .post(this.groupsUrl, JSON.stringify(group), {headers: this.headers})
                            .toPromise()
                            .then(res => res.json().data)
                            .catch(this.handleError);
                    });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}