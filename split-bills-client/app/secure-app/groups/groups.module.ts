import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { BillsModule } from '../bills/bills.module';

import { GroupsComponent }      from './groups.component';
import { GroupDetailComponent } from './group-detail.component';
import { NewGroupComponent }    from './new-group.component';

import { GroupService } from './group.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BillsModule
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
export class GroupModule { }