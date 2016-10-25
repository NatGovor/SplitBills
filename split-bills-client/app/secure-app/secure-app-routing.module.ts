import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecureAppComponent } from './secure-app.component';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent }   from './profile.component';
import { FriendsComponent }   from './friends/friends.component';
import { GroupsComponent }    from './groups/groups.component';

import { AuthGuard } from '../auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: SecureAppComponent,
                canActivate: [AuthGuard],
                children: [
                    {
                        path: '',
                        canActivateChild: [AuthGuard],
                        children: [
                            { path: 'profile', component: ProfileComponent },
                            { path: 'friends', component: FriendsComponent },                            
                            { path: 'dashboard', component: DashboardComponent },
                            { path: 'groups', component: GroupsComponent }
                        ]
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class SecureAppRoutingModule {}