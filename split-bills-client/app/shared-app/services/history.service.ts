import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";

@Injectable()
export class HistoryService {
    history: NavigationEnd[] = [];

    constructor(private router: Router) {
    }

    addPage(route: NavigationEnd): void {
        if (this.history.length === 0) {
            this.history.push(route);
        } else {
            let lastUrl = this.getLastUrl();
            if (lastUrl !== route.url) {
                this.history.push(route);
            }
        }
    }

    back(): void {
        this.history.pop();
        let lastUrl = this.getLastUrl();
        if (lastUrl) {
            this.router.navigate([lastUrl]);
        }
    }

    private getLastUrl(): string {
        let lastEvent = this.history[this.history.length - 1];
        if (lastEvent) {
            return lastEvent.url;
        }
    }
}