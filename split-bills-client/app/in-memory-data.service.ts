import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let users = [
            { 
                id: 1, 
                name: 'Nata', 
                email: 'nata@test.com',
                password: 'testpwd1'/*,
                friends: [
                    {
                        userId: 2,
                        name: 'Alex'
                    },
                    {
                        userId: 3,
                        name: 'Alexandra'
                    },
                    {
                        userId: 4,
                        name: 'Igor'
                    },
                    {
                        userId: 6,
                        name: 'Dima'
                    },
                    {
                        userId: 7,
                        name: 'Alexnekot'
                    }
                ]*/
            },
            { 
                id: 2,
                name: 'Alex',
                email: 'alex@test.com',
                password: 'testpwd1'/*,
                friends: [
                    {
                        userId: 1,
                        name: 'Nata'
                    }
                ]*/
            },
            { 
                id: 3,
                name: 'Alexandra',
                email: 'alexandra@test.com',
                password: 'testpwd1'/*,
                friends: [
                    {
                        userId: 1,
                        name: 'Nata'
                    },
                    {
                        userId: 4,
                        name: 'Igor'
                    }
                ]*/
            },
            { 
                id: 4,
                name: 'Igor',
                email: 'igor@test.com',
                password: 'testpwd1'/*,
                friends: [
                    {
                        userId: 1,
                        name: 'Nata'
                    },
                    {
                        userId: 3,
                        name: 'Alexandra'
                    }
                ]*/
            },
            { 
                id: 5,
                name: 'John',
                email: 'john@test.com',
                password: 'testpwd1'/*,
                friends: []*/
            },
            { 
                id: 6,
                name: 'Dima',
                email: 'dima@test.com',
                password: 'testpwd1'/*,
                friends: [
                    {
                        userId: 1,
                        name: 'Nata'
                    }
                ]*/
            },
            { 
                id: 7,
                name: 'Alexnekot',
                email: 'alexnekot@test.com',
                password: 'testpwd1'/*,
                friends: [
                    {
                        userId: 1,
                        name: 'Nata'
                    }
                ]*/
            }
        ];

        return {users};
    }
}