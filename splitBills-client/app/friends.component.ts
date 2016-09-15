import { Component, Input } from '@angular/core';

import { Friend } from './models/friend';

@Component({
    selector: 'friends',
    templateUrl: 'app/friends.component.html'
})
export class FriendsComponent {
    @Input()
    friends: Friend[];
}