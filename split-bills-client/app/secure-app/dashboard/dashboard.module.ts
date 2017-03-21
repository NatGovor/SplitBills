import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { SharedModule } from '../../shared-app/shared.module';

import { DashboardComponent } from './components/dashboard.component';

import { DashboardService } from './services/dashboard.service';

import { ModalModule } from 'ng2-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
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