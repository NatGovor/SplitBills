import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsComponent }   from './bills.component';
import { NewBillComponent } from './new-bill.component';

import { BillService } from './bill.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        BillsComponent,
        NewBillComponent
    ],
    providers: [
        BillService
    ],
    exports: [
        BillsComponent,
        NewBillComponent
    ]
})
export class BillsModule { }