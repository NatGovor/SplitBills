import { NgModule }      from '@angular/core';

import { MakePositivePipe } from './pipes/make-positive.pipe';
import { PaidByPipe } from './pipes/paid-by.pipe';

@NgModule({
    declarations: [
        MakePositivePipe,
        PaidByPipe
    ],
    exports: [
        MakePositivePipe,
        PaidByPipe
    ]
})
export class SharedModule { }