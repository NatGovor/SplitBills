import { NgModule }      from '@angular/core';

import { MakePositivePipe } from './pipes/make-positive.pipe';

@NgModule({
    declarations: [
        MakePositivePipe
    ],
    exports: [
        MakePositivePipe
    ]
})
export class SharedModule { }