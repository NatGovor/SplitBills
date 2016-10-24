import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GroupsComponent } from './groups.component';
import { GroupDetailComponent } from './group-detail.component';
import { NewGroupComponent } from './new-group.component';

@NgModule({
    /*imports: [
        RouterModule.forChild([
            { path: 'groups', component: GroupsComponent },
            { path: 'groups/:id', component: GroupDetailComponent },
            { path: 'groups/new/:userId', component: NewGroupComponent }
        ])
    ],
    exports: [
        RouterModule
    ]*/
})
export class GroupsRoutingModule {}