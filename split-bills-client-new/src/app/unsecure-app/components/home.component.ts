import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(private authService: AuthService, private router: Router) {
        if (this.authService.isLoggedIn) {
            this.router.navigate(['/dashboard']);
        }
    }
}
