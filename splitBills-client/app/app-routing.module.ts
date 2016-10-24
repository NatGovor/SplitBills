import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';

import { AuthGuard } from './auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forRoot([
            /*{
                path: 'home',
                component: HomeComponent
            },
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full'
            }*/
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}