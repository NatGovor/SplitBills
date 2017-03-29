import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

/*import { DashboardModule } from './dashboard/dashboard.module';*/
import { FriendsModule } from './friends/friends.module';
import { GroupModule } from './groups/groups.module';
import { SharedModule } from '../common/shared.module';

import { SecureAppComponent } from './secure-app.component';
import { ProfileComponent } from './profile/components/profile.component';
import { DashboardComponent } from './dashboard/components/dashboard.component';

import { SecureAppRoutingModule } from './secure-app-routing.module';

import { BillsRefreshInteraction } from './services/bills-refresh-interaction.service';

//import { ModalModule } from 'ng2-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        SecureAppRoutingModule,
        FriendsModule,
        GroupModule,
        SharedModule,
        /*DashboardModule,*/
    ],
    declarations: [
        SecureAppComponent,
        ProfileComponent,
        DashboardComponent
    ],
    providers: [
        BillsRefreshInteraction
    ]
})
export class SecureAppModule { }
