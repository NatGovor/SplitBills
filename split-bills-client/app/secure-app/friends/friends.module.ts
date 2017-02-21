import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsComponent }   from './friends.component';
import { FriendDetailComponent } from './friend-detail.component';

import { FriendService } from './friend.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FriendsComponent,
        FriendDetailComponent
    ],
    providers: [
        FriendService
    ]
})
export class FriendsModule { }