import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <h1>My First Angular 2 App 123</h1>
        <nav>
            <a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>
            <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
            <a routerLink="/admin" routerLinkActive="active">Admin</a>
            <a routerLink="/login" routerLinkActive="active">Login</a>
        </nav>
        <router-outlet></router-outlet>
    `
})
export class AppComponent { }