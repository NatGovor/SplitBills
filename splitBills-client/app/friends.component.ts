import { Component, OnInit } from '@angular/core';

import { Friend } from './friend';
import { FriendDetailComponent } from './friend-detail.component';
import { FriendService } from './friend.service';

@Component({
    selector: 'friends',
    templateUrl: 'app/friends.component.html',
    styleUrls: ['app/friends.component.css'],
    directives: [FriendDetailComponent],
    providers: [FriendService]
})
export class FriendsComponent implements OnInit {
    title = 'Friends';
    friends: Friend[];
    selectedFriend: Friend;
    error: any;
    
    constructor(private friendService: FriendService) { }
    
    ngOnInit() {
        this.getFriends();
    }
    
    getFriends() {
        this.friendService.getFriends().then(friends => this.friends = friends);
    }
    
    onSelect(friend: Friend) { this.selectedFriend = friend; }
    
    delete(friend: Friend, event: any) {
        event.stopPropagation();
        this.friendService.delete(friend)
            .then(res => {
                this.friends = this.friends.filter(f => f !== friend);
                if (this.selectedFriend === friend) { this.selectedFriend = null };
            })
            .catch(error => this.error = error);
    }
}