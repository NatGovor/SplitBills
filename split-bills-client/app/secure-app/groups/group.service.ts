import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Group } from './group';

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
        return this.userService.getUser(userId)
                .then(user => this.getGroups().then(groups => groups.filter(
                    group => {
                        for (let i=0; i < group.friends.length; i++) {
                            if (group.friends[i].userId === user.id) {
                                return true;
                            }
                        }
                    }
                )));
    }

    getGroup(id: number): Promise<Group> {
        return this.getGroups()
            .then(groups => groups.find(group => group.id === id));
    }

    create(group: Group): Promise<Group> {
        // TODO: remove this code when backend is ready
        group.friends.forEach(friend => {
            if (friend.userId) {
                this.friendService.addFriends(friend.userId, group.friends.filter(f => f.userId != friend.userId));
            }
        });

        return this.http
            .post(this.groupsUrl, JSON.stringify(group), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}