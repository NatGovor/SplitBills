import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MakePositivePipe } from './pipes/make-positive.pipe';
import { PaidByPipe } from './pipes/paid-by.pipe';

import { ModalModule } from 'ng2-bootstrap';
import { SettleUpComponent } from '../secure-app/settle-up/components/settle-up.component/settle-up.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ModalModule.forRoot()
    ],
    declarations: [
        MakePositivePipe,
        PaidByPipe,
        SettleUpComponent
    ],
    exports: [
        MakePositivePipe,
        PaidByPipe,
        SettleUpComponent
    ]
})
export class SharedModule { }
