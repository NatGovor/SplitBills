import { USERS } from '../fake-data/fake-users';

export class HelpersStub {
    getUserFromStorage() {
        return USERS[0];
    }
}
