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

    constructor(private userService: UserService) {}

    login(email: string, password: string): Promise<boolean> {
        return this.userService.getUsers()
            .then(users => users.find(user => user.email === email && user.password === password))
            .then((user) => {
                if (user) {
                    this.isLoggedIn = true;
                }
            });
    }

    logout(): void {
        this.isLoggedIn = false;
    }
}