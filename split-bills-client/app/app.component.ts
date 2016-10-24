import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <button (click)="logout()" *ngIf="authService.isLoggedIn">Logout</button>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
    title = "My Split bills";

    constructor(public authService: AuthService) {}

    logout() {
        this.authService.logout();
    }
}