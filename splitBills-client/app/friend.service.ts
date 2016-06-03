import { Injectable } from '@angular/core';

import { FRIENDS } from './mock-friends';

@Injectable()
export class FriendService {
    getFriends() {
        return Promise.resolve(FRIENDS);
    }
}