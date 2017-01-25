import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared.module';

import { DashboardComponent } from './dashboard.component';

import { DashboardService } from './dashboard.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        DashboardComponent
    ],
    providers: [
        DashboardService
    ]
})
export class DashboardModule { }