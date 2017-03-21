import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared-app/services/in-memory-data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SecureAppModule } from './secure-app/secure-app.module';
import { LoginRoutingModule } from './shared-app/login-routing.module';
import { LoginComponent } from './shared-app/components/login.component';
import { HomeComponent } from './shared-app/components/home.component';

import { UserService } from './shared-app/services/user.service';
import { HelpersService } from './shared-app/services/helpers.service';
import { DialogService } from './shared-app/services/dialog.service';

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
        DialogService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }