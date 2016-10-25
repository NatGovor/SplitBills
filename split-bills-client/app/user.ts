import { Friend } from './secure-app/friends/friend';

export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    friends: Friend[];
}