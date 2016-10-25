import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecureAppComponent } from './secure-app.component';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent }   from './profile.component';

import { SecureAppRoutingModule } from './secure-app-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SecureAppRoutingModule
    ],
    declarations: [
        SecureAppComponent,
        DashboardComponent,
        ProfileComponent
    ]
})
export class SecureAppModule { }