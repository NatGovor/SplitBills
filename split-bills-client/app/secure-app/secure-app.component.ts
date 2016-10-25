import { Component } from '@angular/core';
import { Router }    from '@angular/router';

@Component({
    template: `
        <h2>Hello, {{userEmail}}!</h2>
        <nav>
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            <a routerLink="/profile" routerLinkActive="active">Profile</a>
            <a routerLink="/friends" routerLinkActive="active">Friends</a>
            <a routerLink="/groups" routerLinkActive="active">Groups</a>
        </nav>
        <router-outlet></router-outlet>
    `
})
export class SecureAppComponent {
    userEmail: string;

    constructor() {
        this.userEmail = localStorage.getItem('userEmail');
    }
}