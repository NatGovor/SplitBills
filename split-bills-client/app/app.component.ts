import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './shared-app/services/auth.service';

@Component({
    selector: 'my-app',
    template: `
        <div class="container">
            <h1>My Split bills</h1>
            <button (click)="logout()" *ngIf="authService.isLoggedIn">Logout</button>
            <nav>
                <a *ngIf="!authService.isLoggedIn" routerLink="/login">Login</a>
            </nav>
            <router-outlet></router-outlet>
        </div>
    `
})
export class AppComponent {
    constructor(public authService: AuthService, private router: Router) {}

    logout(): void {
        this.authService.logout();
        this.router.navigate(['']);
    }
}