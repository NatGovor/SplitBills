import { Component } from '@angular/core';
import { Router }    from '@angular/router';

import { AuthService } from './auth.service';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <button (click)="logout()" *ngIf="authService.isLoggedIn">Logout</button>
        <nav>
            <a *ngIf="!authService.isLoggedIn" routerLink="/login">Login</a>
        </nav>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
    title = "My Split bills";

    constructor(public authService: AuthService, private router: Router) {}

    logout() {
        this.authService.logout();
        this.router.navigate(['']);
    }
}