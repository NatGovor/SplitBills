import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';

import { loginRoutes,
         authProviders } from './login.routing';

import { AuthGuard } from './auth-guard.service';

const appRoutes: Routes = [
    ...loginRoutes,
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

export const appRoutingProviders: any[] = [
    authProviders
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);