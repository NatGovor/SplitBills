import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared.module';

import { DashboardComponent } from './dashboard.component';

import { DashboardService } from './dashboard.service';

import { ModalModule } from 'ng2-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ModalModule.forRoot()
    ],
    declarations: [
        DashboardComponent
    ],
    providers: [
        DashboardService
    ]
})
export class DashboardModule { }