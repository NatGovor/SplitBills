import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

/*import { ModalModule, TooltipModule } from 'ng2-bootstrap';*/

import { GroupsComponent } from './components/groups.component';
import { GroupDetailComponent } from './components/group-detail.component';
import { NewGroupComponent } from './components/new-group.component';
import { GroupBalancesComponent } from './components/group-balances.component';

import { BillsModule } from '../bills/bills.module';
import { SharedModule } from '../../common/shared.module';


import { GroupService } from './services/group.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BillsModule,
        /*TooltipModule.forRoot(),
        ModalModule.forRoot(),*/
        SharedModule
    ],
    declarations: [
        GroupsComponent,
        GroupDetailComponent,
        NewGroupComponent,
        GroupBalancesComponent
    ],
    providers: [
        GroupService
    ]
})
export class GroupModule { }
