import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './shared-app/services/auth.service';
import { HistoryService } from './shared-app/services/history.service';

@Component({
    selector: 'my-app',
    template: `
        <div class="container">
            <h1>My Split bills</h1>
            <button (click)="logout()" *ngIf="authService.isLoggedIn">Logout</button>
            <nav>
                <a *ngIf="!authService.isLoggedIn" routerLink="/login">Login</a>
            </nav>
            <router-outlet></router-outlet>
        </div>
    `
})
export class AppComponent implements OnInit, OnDestroy {
    subscription: Subscription;

    constructor(
        public authService: AuthService,
        private router: Router,
        private historyService: HistoryService) { }

    ngOnInit(): void {
        this.subscription = this.router.events
            .filter((e) => e instanceof NavigationEnd)
            .subscribe((e) => {
                this.historyService.addPage(e as NavigationEnd);
            });
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['']);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
