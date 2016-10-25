import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsComponent }   from './groups.component';

import { GroupService } from './group.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        GroupsComponent
    ],
    providers: [
        GroupService
    ]
})
export class GroupModule { }