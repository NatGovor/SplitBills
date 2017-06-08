import { Group } from '../../common/models/group';
import { Friend } from '../../common/models/friend';

export let GROUPS: Group[] = [
    new Group(21, 'Test Group 1', [
        new Friend('Nata', 11, 'nata@test.com'),
        new Friend('Alex', 12, 'alex@test.com'),
        new Friend('Unreal', 16)
    ]),
    new Group(22, 'Test Group 2', [
        new Friend('Alex', 12, 'alex@test.com'),
        new Friend('Nata', 11, 'nata@test.com')
    ]),
    new Group(23, 'Test Group 3', [
        new Friend('Chris', 15, 'chris@test.com')
    ])
];
