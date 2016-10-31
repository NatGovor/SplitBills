import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent }     from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SecureAppModule }    from './secure-app/secure-app.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent }     from './login.component';
import { HomeComponent }      from './home.component';

import { UserService } from './user.service';
import { Helpers }     from './helpers';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        SecureAppModule,
        LoginRoutingModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent
    ],
    providers: [
        UserService,
        Helpers
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }