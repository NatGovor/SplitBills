import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FriendsComponent } from './components/friends.component/friends.component';
import { FriendDetailComponent } from './components/friend-detail.component/friend-detail.component';
import { EditFriendComponent } from './components/edit-friend.component/edit-friend.component';

import { FriendService } from './services/friend.service';

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
