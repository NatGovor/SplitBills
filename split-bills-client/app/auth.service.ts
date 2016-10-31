import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import { UserService } from './user.service';
import { Helpers }     from './helpers';

@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    constructor(
        private userService: UserService,
        private helpers: Helpers) {
        this.isLoggedIn = !!this.helpers.getStorageProperty('authToken');
    }

    login(email: string, password: string): Promise<boolean> {
        return this.userService.getUsers()
            .then(users => users.find(user => user.email === email && user.password === password))
            .then((user) => {
                if (user) {
                    this.helpers.setStorageProperty('authToken', '12345678');
                    this.helpers.setStorageProperty('user', user);
                    this.isLoggedIn = true;
                    return true;
                }
            });
    }

    logout(): void {
        this.helpers.setStorageProperty('user', null);
        this.helpers.setStorageProperty('authToken', null);
        this.isLoggedIn = false;
    }
}