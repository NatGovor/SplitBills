import { Component, Input } from '@angular/core';

import { Friend } from './friend';

@Component({
    selector: 'friends',
    templateUrl: 'app/friends/friends.component.html'
})
export class FriendsComponent {
    friends: Friend[];
}