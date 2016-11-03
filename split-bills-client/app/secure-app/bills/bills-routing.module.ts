import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillsComponent } from './bills.component';

import { AuthGuard } from '../../auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'bills',
                component: BillsComponent,
                canActivate: [AuthGuard]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class BillsRoutingModule {}