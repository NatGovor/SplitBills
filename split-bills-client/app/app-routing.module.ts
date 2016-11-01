import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { CanDeactivateGuard } from './can-deactivate-guard.service';

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