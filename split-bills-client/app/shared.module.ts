import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { MakePositivePipe } from './pipes/make-positive.pipe';
import { PaidByPipe } from './pipes/paid-by.pipe';

import { SettleUpComponent } from './secure-app/settle-up.component';
import { ModalModule } from 'ng2-bootstrap';

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