import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { FriendsComponent }   from './friends.component';
import { FriendDetailComponent } from './friend-detail.component';
import { EditFriendComponent } from './edit-friend.component';

import { FriendService } from './friend.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        FriendsComponent,
        FriendDetailComponent,
        EditFriendComponent
    ],
    providers: [
        FriendService
    ]
})
export class FriendsModule { }