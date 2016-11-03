import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsRoutingModule } from './bills-routing.module';

import { BillsComponent } from './bills.component';

@NgModule({
    imports: [
        CommonModule,
        BillsRoutingModule
    ],
    declarations: [
        BillsComponent
    ]
})
export class BillsModule { }