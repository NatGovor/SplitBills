import { Injectable } from '@angular/core';

import { Group } from './group';
import { GROUPS } from './mock-groups';

@Injectable()
export class GroupService {
    getGroups(): Promise<Group[]> {
        return Promise.resolve(GROUPS);
    }

    /*getUserGroups(userId: number): Promise<Group[]> {
        return this.getGroups()
                    .then(groups => groups.find(group => group.users));
    }*/
}