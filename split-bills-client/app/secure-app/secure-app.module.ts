import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsModule } from './friends/friends.module';
import { GroupModule }   from './groups/groups.module';
import { SharedModule }  from '../shared.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { SecureAppComponent } from './secure-app.component';
import { ProfileComponent }   from './profile.component';

import { SecureAppRoutingModule } from './secure-app-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SecureAppRoutingModule,
        FriendsModule,
        GroupModule,
        SharedModule,
        DashboardModule
    ],
    declarations: [
        SecureAppComponent,
        ProfileComponent
    ]
})
export class SecureAppModule { }