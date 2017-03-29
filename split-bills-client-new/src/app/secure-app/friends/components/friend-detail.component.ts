import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Friend } from '../../../common/models/friend';

//import { HistoryService } from '../../../shared-app/services/history.service';
import { UserService } from '../../../common/services/user.service';

@Component({
    templateUrl: './/friend-detail.component.html'
})
export class FriendDetailComponent implements OnInit {
    friend: Friend;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        /*private historyService: HistoryService*/) {}

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            const id = +params['id'];
            this.userService.getUser(id).then((user) => this.friend = new Friend(user.name, user.id, user.email));
        });
    }

    goBack(): void {
        //this.historyService.back();
    }

    editFriendInfo(): void {
        this.router.navigate(['friends', this.friend.userId, 'edit']);
    }
}
