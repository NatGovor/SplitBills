import { Friend } from './friend';

export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    isReal: boolean;
    friends: Friend[];

    constructor(id: number, name: string, email: string, password: string,
        isReal: boolean, friends: Friend[]) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.isReal = isReal;
        this.friends = friends;
    }
}
