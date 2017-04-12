import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './common/services/in-memory-data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SecureAppModule } from './secure-app/secure-app.module';
import { HomeComponent } from './unsecure-app/components/home.component/home.component';
import { LoginComponent } from './unsecure-app/components/login.component/login.component';
import { LoginRoutingModule } from './unsecure-app/login-routing.module';

import { UserService } from './common/services/user.service';
import { DialogService } from './common/services/dialog.service';
import { HelpersService } from './common/services/helpers.service';
import { HistoryService } from './common/services/history.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    LoginRoutingModule,
    AppRoutingModule,
    SecureAppModule
  ],
  providers: [
    UserService,
    HelpersService,
    DialogService,
    HistoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
