import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import './rxjs-extensions';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { AccountComponent } from './account.component';
import { FriendsComponent } from './friends/friends.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';

import { UserService } from './user.service';

import { routing, appRoutingProviders } from './app.routing';

@NgModule({
    imports: [ 
        BrowserModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        routing,
        FormsModule
    ],
    declarations: [
        AppComponent,
        AccountComponent,
        FriendsComponent,
        DashboardComponent,
        LoginComponent,
        HomeComponent
    ],
    providers: [
        UserService,
        appRoutingProviders
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
