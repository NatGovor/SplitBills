import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { AppComponent } from './app.component';
import { AccountComponent } from './account.component';
import { FriendsComponent } from './friends.component';
import { GroupsComponent } from './groups.component';
import { GroupDetailComponent } from './group-detail.component';
import { DashboardComponent } from './dashboard.component';

import { UserService } from './services/user.service';
import { GroupService } from './services/group.service';

import { routing } from './app.routing';

@NgModule({
    imports: [ 
        BrowserModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
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
