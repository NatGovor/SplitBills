import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import { UserService } from './user.service';

@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    constructor(private userService: UserService) {
        this.isLoggedIn = !!localStorage.getItem('authToken');
    }

    login(email: string, password: string): Promise<boolean> {
        return this.userService.getUsers()
            .then(users => users.find(user => user.email === email && user.password === password))
            .then((user) => {
                if (user) {
                    localStorage.setItem('authToken', '12345678');
                    localStorage.setItem('user', JSON.stringify(user));
                    this.isLoggedIn = true;
                    return true;
                }
            });
    }

    logout(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('authToken')
        this.isLoggedIn = false;
    }
}