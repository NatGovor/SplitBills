import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsModule } from './friends/friends.module';
import { GroupModule }   from './groups/groups.module';
import { BillsModule }   from './bills/bills.module';

import { SecureAppComponent } from './secure-app.component';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent }   from './profile.component';

import { SecureAppRoutingModule } from './secure-app-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SecureAppRoutingModule,
        FriendsModule,
        GroupModule,
        BillsModule
    ],
    declarations: [
        SecureAppComponent,
        DashboardComponent,
        ProfileComponent
    ]
})
export class SecureAppModule { }