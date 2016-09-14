import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AccountComponent } from './account.component';
import { FriendsComponent } from './friends.component';
import { GroupsComponent } from './groups.component';
import { GroupDetailComponent } from './group-detail.component';
import { DashboardComponent } from './dashboard.component';

import { UserService } from './user.service';
import { GroupService } from './group.service';

import { routing } from './app.routing';

@NgModule({
    imports: [ 
        BrowserModule,
        routing
    ],
    declarations: [
        AppComponent,
        AccountComponent,
        FriendsComponent,
        GroupsComponent,
        GroupDetailComponent,
        DashboardComponent
    ],
    providers: [
        UserService,
        GroupService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
