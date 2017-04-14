import { Component, OnInit } from '@angular/core';

import { User } from '../../../../common/models/user';

import { HelpersService } from '../../../../common/services/helpers.service';
import { UserService } from '../../../../common/services/user.service';

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    user: User;

    constructor(
        private userService: UserService,
        private helpers: HelpersService) {}

    ngOnInit(): void {
        this.userService.get(this.helpers.getUserFromStorage().id)
            .then((user) => this.user = user);
    }
}
