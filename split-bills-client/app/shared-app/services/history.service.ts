import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable()
export class HistoryService {
    history: NavigationEnd[] = [];

    constructor(private router: Router) {
    }

    addPage(route: NavigationEnd): void {
        if (this.history.length === 0) {
            this.history.push(route);
        } else {
            const lastUrl = this.getLastUrl();
            if (lastUrl !== route.url) {
                this.history.push(route);
            }
        }
    }

    back(): void {
        this.history.pop();
        const lastUrl = this.getLastUrl();
        if (lastUrl) {
            this.router.navigate([lastUrl]);
        }
    }

    private getLastUrl(): string {
        const lastEvent = this.history[this.history.length - 1];
        if (lastEvent) {
            return lastEvent.url;
        }
    }
}
