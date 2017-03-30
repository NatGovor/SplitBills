import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './unsecure-app/services/auth.service';
import { HistoryService } from './common/services/history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
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
