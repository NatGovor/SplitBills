import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsRoutingModule } from './bills-routing.module';

import { BillsComponent } from './bills.component';

import { BillService } from './bill.service';

@NgModule({
    imports: [
        CommonModule,
        BillsRoutingModule
    ],
    declarations: [
        BillsComponent
    ],
    providers: [
        BillService
    ]
})
export class BillsModule { }