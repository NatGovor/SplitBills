import { User } from '../../models/user';
import { Friend } from '../../models/friend';

export let USERS: User[] = [
    new User(11, 'Nata', 'nata@test.com', 'testpwd1', true, [
        new Friend('Alex', 12, 'alex@test.com'),
        new Friend('Bob', 12, 'bob@test.com'),
        new Friend('Test', 16)
    ]),
    new User(12, 'Alex', 'alex@test.com', 'testpwd1', true, [
        new Friend('Nata', 11, 'nata@test.com')
    ]),
    new User(13, 'Test', 'test@test.com', 'testpwd1', true, []),
    new User(14, 'Bob', 'bob@test.com', 'testpwd1', true, [
        new Friend('Nata', 11, 'nata@test.com')
    ]),
    new User(15, 'Chris', 'chris@test.com', 'testpwd1', true, []),
    new User(16, 'Test', '', '', false, [])
];
