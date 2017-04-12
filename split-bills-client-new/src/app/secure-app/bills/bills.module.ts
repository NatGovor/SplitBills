import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../common/shared.module';

import { BillsComponent } from './components/bills.component/bills.component';
import { NewBillComponent } from './components/new-bill.component/new-bill.component';

import { BillService } from './services/bill.service';

import { SplitTypePipe } from './pipes/split-type.pipe';

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
