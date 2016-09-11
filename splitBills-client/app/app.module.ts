import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AccountComponent } from './account.component';
import { FriendsComponent } from './friends.component';

@NgModule({
    imports: [ BrowserModule ],
    declarations: [
        AppComponent,
        AccountComponent,
        FriendsComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
