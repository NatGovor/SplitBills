import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardModule } from './dashboard/dashboard.module';
import { FriendsModule } from './friends/friends.module';
import { GroupModule } from './groups/groups.module';
import { SharedModule } from '../common/shared.module';

import { SecureAppComponent } from './secure-app.component';
import { ProfileComponent } from './profile/components/profile.component/profile.component';

import { SecureAppRoutingModule } from './secure-app-routing.module';

import { BillsRefreshInteraction } from './services/bills-refresh-interaction.service';

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
    ],
    providers: [
        BillsRefreshInteraction
    ]
})
export class SecureAppModule { }
