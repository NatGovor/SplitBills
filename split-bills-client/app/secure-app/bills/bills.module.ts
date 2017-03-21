import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { SharedModule } from '../../shared-app/shared.module';

import { BillsComponent }   from './bills.component';
import { NewBillComponent } from './new-bill.component';

import { BillService } from './bill.service';

import { SplitTypePipe }  from './pipes/split-type.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        BillsComponent,
        NewBillComponent,
        SplitTypePipe
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