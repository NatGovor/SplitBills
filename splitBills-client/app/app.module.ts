import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AccountComponent } from './account.component';
import { FriendsComponent } from './friends.component';
import { GroupsComponent } from './groups.component';

import { UserService } from './user.service';
import { GroupService } from './group.service';

@NgModule({
    imports: [ BrowserModule ],
    declarations: [
        AppComponent,
        AccountComponent,
        FriendsComponent,
        GroupsComponent
    ],
    providers: [
        UserService,
        GroupService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
