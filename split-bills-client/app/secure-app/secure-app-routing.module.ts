import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecureAppComponent }    from './secure-app.component';
import { DashboardComponent }    from './dashboard/dashboard.component';
import { ProfileComponent }      from './profile.component';
import { FriendsComponent }      from './friends/friends.component';
import { FriendDetailComponent } from './friends/friend-detail.component';
import { EditFriendComponent }   from './friends/edit-friend.component';
import { GroupsComponent }       from './groups/groups.component';
import { GroupDetailComponent }  from './groups/group-detail.component';
import { NewGroupComponent }     from './groups/new-group.component';
import { NewBillComponent }      from './bills/new-bill.component';

import { AuthGuard } from '../shared-app/services/auth-guard.service';

import { CanDeactivateGuard } from '../shared-app/services/can-deactivate-guard.service';

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
                            { path: 'friends/:id', component: FriendDetailComponent },
                            { path: 'friends/:id/edit', component: EditFriendComponent },
                            { path: 'dashboard', component: DashboardComponent },
                            { path: 'groups', component: GroupsComponent },                            
                            { path: 'groups/new', component: NewGroupComponent, canDeactivate: [CanDeactivateGuard] },
                            { path: 'groups/:id', component: GroupDetailComponent },
                            { path: 'groups/bill/new', component: NewBillComponent, canDeactivate: [CanDeactivateGuard] }
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