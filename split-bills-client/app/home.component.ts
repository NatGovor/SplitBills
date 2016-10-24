import { Component } from '@angular/core';
import { Router }    from '@angular/router';

@Component({
    template: `
        <nav>
            <a routerLink="/login">Login</a>
        </nav>
        <h2>Home</h2>
    `
})
export class HomeComponent { }