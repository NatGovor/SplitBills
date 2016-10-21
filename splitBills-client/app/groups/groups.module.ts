import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsComponent } from './groups.component';
import { GroupDetailComponent } from './group-detail.component';
import { NewGroupComponent } from './new-group.component';

import { GroupService } from './group.service';

import { GroupsRoutingModule } from './groups-routing.module';

@NgModule({
    imports: [
        CommonModule,
        GroupsRoutingModule
    ],
    declarations: [
        GroupsComponent,
        GroupDetailComponent,
        NewGroupComponent
    ],
    providers: [
        GroupService
    ]
})
export class GroupsModule {}