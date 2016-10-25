import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsComponent }   from './friends.component';

import { FriendService } from './friend.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FriendsComponent
    ],
    providers: [
        FriendService
    ]
})
export class FriendsModule { }