import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Group } from '../models/group';

@Injectable()
export class GroupService {
    private groupsUrl = 'app/groups'; // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getGroups(): Promise<Group[]> {
        return this.http.get(this.groupsUrl)
                    .toPromise()
                    .then(response => response.json().data as Group[])
                    .catch(this.handleError);
    }

    getUserGroups(userId: number): Promise<Group[]> {
        return this.getGroups().then(groups => groups.filter(
            function (group) {
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

    create(name: string): Promise<Group> {
        return this.http
            .post(this.groupsUrl, JSON.stringify({name: name, friends: []}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}