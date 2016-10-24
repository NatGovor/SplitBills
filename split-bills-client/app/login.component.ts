import { Component } from '@angular/core';
import { Router }    from '@angular/router';

import { AuthService } from './auth.service';

@Component({
    template: `
        <p>
            <button (click)="login()" *ngIf="!authService.isLoggedIn">Login</button>
            <button (click)="logout()" *ngIf="authService.isLoggedIn">Logout</button>
        </p>
    `
})
export class LoginComponent {
    constructor(public authService: AuthService, public router: Router) {}

    login() {
        this.authService.login().subscribe(() => {
            if (this.authService.isLoggedIn) {
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';

                this.router.navigate([redirect]);
            }
        });
    }

    logout() {
        this.authService.logout();
    }
}