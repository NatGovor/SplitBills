import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupDetailComponent } from './group-detail.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { NewGroupComponent } from './new-group.component';

import { loginRoutes,
         authProviders } from './login.routing';

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
    },
    {
        path: 'groups/new/:userId',
        component: NewGroupComponent
    }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);