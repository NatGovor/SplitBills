
export { User } from '../../models/user';
export { UserService } from '../user.service';

import { User } from '../../models/user';
import { UserService } from '../user.service';

export let USERS: User[] = [
    new User(11, 'Nata', 'nata@test.com', 'testpwd1', true, []),
    new User(12, 'Alex', 'alex@test.com', 'testpwd1', true, []),
    new User(13, 'Test', 'test@test.com', 'testpwd1', true, []),
    new User(14, 'Bob', 'bob@test.com', 'testpwd1', true, []),
    new User(15, 'Chris', 'chris@test.com', 'testpwd1', true, [])
];

export class FakeUserService {
    users = USERS.map(u => {
        return new User(u.id, u.name, u.email, u.password, u.isReal, u.friends);
    });
    lastPromise: Promise<any>; // remember so we can spy on promise calls

    getAll() {
        return this.lastPromise = Promise.resolve<User[]>(this.users);
    }

    get(id: number) {
        const user = this.users.find(u => u.id === id);
        return this.lastPromise = Promise.resolve(user);
    }

    update(user: User) {
        return this.lastPromise = this.get(user.id).then(u => {
            return u ?
                Object.assign(u, user) :
                Promise.reject(`User ${user.id} not found`) as any as Promise<User>;
        });
    }

    create(user: User) {

    }
}
