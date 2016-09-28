import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';

import { loginRoutes,
         authProviders } from './login.routing';

import { AuthGuard } from './auth-guard.service';

const appRoutes: Routes = [
    ...loginRoutes,
    /*{
        path: 'groups/:id',
        component: GroupDetailComponent
    },*/
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }/*,
    {
        path: 'groups/new/:userId',
        component: NewGroupComponent
    }*/
];

export const appRoutingProviders: any[] = [
    authProviders
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);