import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import './rxjs-extensions';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';

import { FriendsModule } from './friends/friends.module';
import { GroupsModule } from './groups/groups.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsersModule } from './users/users.module';

import { routing, appRoutingProviders } from './app.routing';

@NgModule({
    imports: [ 
        BrowserModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        routing,
        FormsModule,
        FriendsModule,
        GroupsModule,
        DashboardModule,
        UsersModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent
    ],
    providers: [
        appRoutingProviders
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
