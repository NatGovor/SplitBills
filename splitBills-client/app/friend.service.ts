import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Friend } from './friend';

@Injectable()
export class FriendService {
    private friendsUrl = 'app/friends';
    
    constructor(private http: Http) { }
    
    getFriends(): Promise<Friend[]> {
        return this.http.get(this.friendsUrl)
                   .toPromise()
                   .then(response => response.json().data)
                   .catch(this.handleError);
    }
    
    getFriend(id: number) {
        return this.getFriends()
                   .then(friends => friends.filter(friend => friend.id === id)[0]);
    }
    
    save(friend: Friend): Promise<Friend> {
        if (friend.id) {
            return this.put(friend);
        }
        return this.post(friend);
    }
    
    // Add new Friend
    private post(friend: Friend): Promise<Friend> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        
        return this.http
                   .post(this.friendsUrl, JSON.stringify(friend), {headers: headers})
                   .toPromise()
                   .then(res => res.json().data)
                   .catch(this.handleError);
    }
    
    // Update existing Friend
    private put(friend: Friend) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        let url = `${this.friendsUrl}/${friend.id}`;
        
        return this.http
                   .put(url, JSON.stringify(friend), {headers: headers})
                   .toPromise()
                   .then(() => friend)
    }
    
    public delete(hero: Friend) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        let url = `${this.friendsUrl}/${hero.id}`;
        
        return this.http
                   .delete(url, {headers: headers})
                   .toPromise()
                   .catch(this.handleError);
    }
    
    private handleError(error: any) {
        console.log('An error occured', error);
        return Promise.reject(error.message || error);
    }
}