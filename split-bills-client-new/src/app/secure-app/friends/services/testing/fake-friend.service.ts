import { User } from '../../../../common/models/user';
import { Friend } from '../../../../common/models/friend';
import { USERS } from '../../../../common/services/testing/fake-users';

export class FakeFriendService {
    users = USERS.map(u => {
        return new User(u.id, u.name, u.email, u.password, u.isReal, u.friends);
    });
    lastPromise: Promise<any>; // remember so we can spy on promise calls

    getAllForUser(userId: number) {
        const user = this.users.find((u) => u.id === userId);
        if (user) {
            return this.lastPromise = Promise.resolve<Friend[]>(user.friends);
        } else {
            Promise.reject(`User ${user.id} not found`) as any as Promise<Friend>;
        }
    }
}
