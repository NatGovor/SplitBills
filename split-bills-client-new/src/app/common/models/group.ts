import { Friend } from './friend';

export class Group {
    id: number;
    name: string;
    friends: Friend[];

    constructor(id: number, name: string, friends: Friend[]) {
        this.id = id;
        this.name = name;
        this.friends = friends;
    }
}
