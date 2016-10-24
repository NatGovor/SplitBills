import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }     from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DashboardModule }    from './dashboard/dashboard.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent }     from './login.component';

import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        DashboardModule,
        LoginRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent
    ],
    providers: [

    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }