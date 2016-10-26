import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsComponent }   from './groups.component';
import { GroupDetailComponent }   from './group-detail.component';

import { GroupService } from './group.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        GroupsComponent,
        GroupDetailComponent
    ],
    providers: [
        GroupService
    ]
})
export class GroupModule { }