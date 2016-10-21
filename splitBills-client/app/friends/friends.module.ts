import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsComponent } from './friends.component';

import { FriendsRoutingModule } from './friends-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FriendsRoutingModule
    ],
    declarations: [
        FriendsComponent
    ]
})
export class FriendsModule {}