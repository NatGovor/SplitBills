import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
    template: `
        <h2>Home</h2>
        <p>Split Bills together with your friends!</p>
    `
})
export class HomeComponent { 
    constructor(private authService: AuthService, private router: Router) {
        if (this.authService.isLoggedIn) {
            this.router.navigate(['/dashboard']);
        }
    }
}