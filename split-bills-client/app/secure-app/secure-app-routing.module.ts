import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecureAppComponent } from './secure-app.component';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './profile.component';

import { AuthGuard } from '../auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: SecureAppComponent,
                canActivate: [AuthGuard],
                children: [
                    {
                        path: '',
                        children: [
                            { path: 'profile', component: ProfileComponent },                            
                            { path: 'dashboard', component: DashboardComponent }
                        ]
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class SecureAppRoutingModule {}