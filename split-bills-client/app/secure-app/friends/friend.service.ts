import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Friend } from './friend';
import { User }  from '../../user';

@Injectable()
export class FriendService {
    private usersUrl = 'app/users'; // URL to web api

    constructor(private http: Http) { }

    getFriends(userEmail: string): Promise<Friend[]> {
        return this.http.get(this.usersUrl)
                    .toPromise()
                    .then(response => response.json().data as User[])
                    .then (users => users.find(user => user.email === userEmail))
                    .then (user => user.friends)
                    .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}