import { Friend } from './friend';

export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public password: string,
        public isReal: boolean,
        public friends: Friend[]
    ) {}
}
