import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared-app/shared.module';
import { BillsModule } from '../bills/bills.module';

import { GroupsComponent } from './components/groups.component';
import { GroupDetailComponent } from './components/group-detail.component';
import { NewGroupComponent } from './components/new-group.component';
import { GroupBalancesComponent } from './components/group-balances.component';

import { GroupService } from './services/group.service';

import { TooltipModule, ModalModule } from 'ng2-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BillsModule,
        TooltipModule.forRoot(),
        ModalModule.forRoot(),
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