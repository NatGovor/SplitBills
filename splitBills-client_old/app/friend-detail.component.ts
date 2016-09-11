import { Component, Input } from '@angular/core';
import { Friend } from './friend';

@Component({
    selector: 'expencies-friend-detail',
    templateUrl: 'app/friend-detail.component.html'
})
export class FriendDetailComponent {
    @Input()
    friend: Friend;
}