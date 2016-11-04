import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsComponent } from './bills.component';

import { BillService } from './bill.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        BillsComponent
    ],
    providers: [
        BillService
    ],
    exports: [
        BillsComponent
    ]
})
export class BillsModule { }