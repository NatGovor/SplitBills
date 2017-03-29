import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecureAppComponent } from './secure-app.component';
import { DashboardComponent } from './dashboard/components/dashboard.component';
import { ProfileComponent } from './profile/components/profile.component';
import { FriendsComponent } from './friends/components/friends.component';
import { FriendDetailComponent } from './friends/components/friend-detail.component';
import { EditFriendComponent } from './friends/components/edit-friend.component';
import { GroupsComponent } from './groups/components/groups.component';
import { GroupDetailComponent } from './groups/components/group-detail.component';
import { NewGroupComponent } from './groups/components/new-group.component';
import { NewBillComponent } from './bills/components/new-bill.component';

import { AuthGuard } from '../common/services/auth-guard.service';

import { CanDeactivateGuard } from '../common/services/can-deactivate-guard.service';

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
                            { path: 'dashboard', component: DashboardComponent },
                            { path: 'profile', component: ProfileComponent },
                            { path: 'friends', component: FriendsComponent },
                            { path: 'friends/:id', component: FriendDetailComponent },
                            { path: 'friends/:id/edit', component: EditFriendComponent },
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
