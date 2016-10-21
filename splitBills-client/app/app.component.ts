import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        
        <button (click)="login()" *ngIf="!authService.isLoggedIn">Login</button>
        <button (click)="logout()" *ngIf="authService.isLoggedIn">Logout</button>
        
        <router-outlet></router-outlet>
    `
})
export class AppComponent { 
    title = "My Split bills";

    constructor(public authService: AuthService, public router: Router) { }

    login() {
        this.router.navigate(['login']);      
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['home']);    
    }
}