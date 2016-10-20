import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
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