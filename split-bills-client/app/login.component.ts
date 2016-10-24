import { Component } from '@angular/core';
import { Router }    from '@angular/router';

import { AuthService } from './auth.service';

@Component({
    template: `
        <p>
            Enter Credentials to login:
            <button (click)="login()">Login</button>
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