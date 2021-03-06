import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,
        Router, RouterStateSnapshot} from '@angular/router';

import { AuthService } from '../../unsecure-app/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;

        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    checkLogin(url: string): boolean {
        if (this.authService.isLoggedIn) { return true; }

        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;

        this.router.navigate(['/login']);
        return false;
    }
}
