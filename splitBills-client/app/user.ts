import { Friend } from './friend';

export class User {
    id: number;
    name: string;
    email: string;
    friends: Friend[]
}