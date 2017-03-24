import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared-app/services/in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SecureAppModule } from './secure-app/secure-app.module';
import { HomeComponent } from './shared-app/components/home.component';
import { LoginComponent } from './shared-app/components/login.component';
import { LoginRoutingModule } from './shared-app/login-routing.module';

import { DialogService } from './shared-app/services/dialog.service';
import { HelpersService } from './shared-app/services/helpers.service';
import { HistoryService } from './shared-app/services/history.service';
import { UserService } from './shared-app/services/user.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        LoginRoutingModule,
        AppRoutingModule,
        SecureAppModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent
    ],
    providers: [
        UserService,
        HelpersService,
        DialogService,
        HistoryService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
