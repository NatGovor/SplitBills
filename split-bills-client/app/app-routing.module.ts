import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './shared-app/components/home.component';

import { CanDeactivateGuard } from './shared-app/services/can-deactivate-guard.service';

@NgModule({
    imports: [
        RouterModule.forRoot([   
            {
                path: '',
                component: HomeComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
        CanDeactivateGuard
    ]
})
export class AppRoutingModule { }