export { User } from '../../common/models/user';
export { Friend } from '../../common/models/friend';
export { UserService } from '../../common/services/user.service';
export { USERS } from '../fake-data/fake-users';

import { User } from '../../common/models/user';
import { Friend } from '../../common/models/friend';
import { UserService } from '../../common/services/user.service';

import { USERS } from '../fake-data/fake-users';

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
