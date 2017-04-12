import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { DialogService } from '../../common/services/dialog.service';

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent {
    email: string;
    password: string;

    constructor(
        public authService: AuthService,
        public router: Router,
        private dialogService: DialogService) {
        if (this.authService.isLoggedIn) {
            this.router.navigate(['/dashboard']);
        }
    }

    login(): void {
        this.authService.login(this.email, this.password).then(() => {
            if (this.authService.isLoggedIn) {
                const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';

                this.router.navigate([redirect]);
            } else {
                this.dialogService.alert('Invalid user name or password');
            }
        });
    }
}
