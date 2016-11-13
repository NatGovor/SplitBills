import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { BillsComponent }   from './bills.component';
import { NewBillComponent } from './new-bill.component';

import { BillService } from './bill.service';

import { SplitTypePipe }  from './pipes/split-type.pipe';
import { PaidByPipe }     from './pipes/paid-by.pipe';
import { LentAmountPipe } from './pipes/lent-amount.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        BillsComponent,
        NewBillComponent,
        SplitTypePipe,
        PaidByPipe,
        LentAmountPipe
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