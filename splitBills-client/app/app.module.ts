import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
//import './rxjs-extensions';

// Imports for loading & configuring the in-memory web api
/*import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
*/
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//import { LoginComponent } from './login.component';
//import { HomeComponent } from './home.component';

/*port { FriendsModule } from './friends/friends.module';
import { GroupsModule } from './groups/groups.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsersModule } from './users/users.module';*/

@NgModule({
    imports: [ 
        BrowserModule,
        FormsModule,
        HttpModule,
        //InMemoryWebApiModule.forRoot(InMemoryDataService),
        AppRoutingModule/*,
        FriendsModule,
        GroupsModule,
        DashboardModule,
        UsersModule*/
    ],
    declarations: [
        AppComponent,
        //LoginComponent,
        //HomeComponent
    ],
    providers: [
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
