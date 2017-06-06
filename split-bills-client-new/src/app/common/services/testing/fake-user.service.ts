export { User } from '../../models/user';
export { Friend } from '../../models/friend';
export { UserService } from '../user.service';

import { User } from '../../models/user';
import { Friend } from '../../models/friend';
import { UserService } from '../user.service';

import { USERS } from './fake-users';

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
