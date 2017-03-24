import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EditFriendComponent } from './components/edit-friend.component';
import { FriendDetailComponent } from './components/friend-detail.component';
import { FriendsComponent } from './components/friends.component';

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
