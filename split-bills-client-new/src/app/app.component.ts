import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './unsecure-app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Split bills';

  constructor(
    public authService: AuthService,
    private router: Router) { }

  logout(): void {
      this.authService.logout();
      this.router.navigate(['']);
  }
}
