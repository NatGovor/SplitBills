import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsModule } from './friends/friends.module';
import { GroupModule }   from './groups/groups.module';
import { SharedModule }  from '../shared-app/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { SecureAppComponent } from './secure-app.component';
import { ProfileComponent }   from './profile.component';

import { SecureAppRoutingModule } from './secure-app-routing.module';

import { ComponentsInteraction } from './services/components-interaction.service';

import { ModalModule } from 'ng2-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        SecureAppRoutingModule,
        FriendsModule,
        GroupModule,
        SharedModule,
        DashboardModule,
        ModalModule.forRoot()
    ],
    declarations: [
        SecureAppComponent,
        ProfileComponent
    ],
    providers: [
        ComponentsInteraction
    ]
})
export class SecureAppModule { }