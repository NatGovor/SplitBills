import { Friend } from '../friends/friend';

export class Group {
    constructor(
        public id: number,
        public name: string,
        public friends: Friend[]
    ) {}
}