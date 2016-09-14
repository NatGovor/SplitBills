import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupDetailComponent } from './group-detail.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';

const appRoutes: Routes = [
    {
        path: 'groups/:id',
        component: GroupDetailComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);