import { Friend } from '../friends/friend';

export class User {
    id: number;
    name: string;
    email: string;
    friends: Friend[]
}