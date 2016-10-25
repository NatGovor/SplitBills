import { Component } from '@angular/core';
import { Router }    from '@angular/router';

@Component({
    template: `
        <h2>Hello, user!</h2>
        <nav>
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            <a routerLink="/profile" routerLinkActive="active">Profile</a>
        </nav>
        <router-outlet></router-outlet>
    `
})
export class SecureAppComponent {}