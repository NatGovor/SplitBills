import { Component } from '@angular/core';
import { Router }    from '@angular/router';

import { AuthService } from './auth.service';

@Component({
    template: `
        <div>
            <p>Enter Credentials to login:</p>
            <div class="form-group">
                <label>Email: </label>
                <input [(ngModel)]="email" type="text" class="form-control" />
            </div>
            <div class="form-group">
                <label>Password: </label>
                <input [(ngModel)]="password" type="password" class="form-control" />
            </div>
            <div class="form-group">
                <button (click)="login()" type="submit">Login</button>
            </div>
        </div>
    `
})
export class LoginComponent {
    email: string;
    password: string;

    constructor(public authService: AuthService, public router: Router) {
        if (this.authService.isLoggedIn) {
            this.router.navigate(['/dashboard']);
        }
    }

    login() {
        this.authService.login(this.email, this.password).then(() => {
            if (this.authService.isLoggedIn) {
                localStorage.setItem('userEmail', this.email);
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';

                this.router.navigate([redirect]);
            } else {
                console.log('Invalid user name or password');
            }
        });
    }
}