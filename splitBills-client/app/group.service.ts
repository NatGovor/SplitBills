import { Injectable } from '@angular/core';

import { Group } from './group';
import { GROUPS } from './mock-groups';

@Injectable()
export class GroupService {
    getGroups(): Promise<Group[]> {
        return Promise.resolve(GROUPS);
    }

    getUserGroups(userId: number): Promise<Group[]> {
        return this.getGroups().then(groups => groups.filter(
            function (group) {
                for (let i=0; i < group.friends.length; i++) {
                    if (group.friends[i].userId === userId) {
                        return true;
                    }
                }
            }));
    }
}