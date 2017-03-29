import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//import { NewBillComponent } from './bills/components/new-bill.component';
import { DashboardComponent } from './dashboard/components/dashboard.component';
/*import { EditFriendComponent } from './friends/components/edit-friend.component';
import { FriendDetailComponent } from './friends/components/friend-detail.component';
import { FriendsComponent } from './friends/components/friends.component';
import { GroupDetailComponent } from './groups/components/group-detail.component';
import { GroupsComponent } from './groups/components/groups.component';
import { NewGroupComponent } from './groups/components/new-group.component';
import { ProfileComponent } from './profile/components/profile.component';*/
import { SecureAppComponent } from './secure-app.component';

import { AuthGuard } from '../common/services/auth-guard.service';

/*import { CanDeactivateGuard } from '../shared-app/services/can-deactivate-guard.service';*/

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
                            { path: 'dashboard', component: DashboardComponent }
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
