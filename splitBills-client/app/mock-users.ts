import { User } from './user';

export const USERS: User[] = [
    { 
        id: 1, 
        name: 'Nata', 
        email: 'nata@test.com',
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
        ]
    },
    { 
        id: 2,
        name: 'Alex',
        email: 'alex@test.com',
        friends: [
            {
                userId: 1,
                name: 'Nata'
            }
        ]
    },
    { 
        id: 3,
        name: 'Alexandra',
        email: 'alexandra@test.com',
        friends: [
            {
                userId: 1,
                name: 'Nata'
            },
            {
                userId: 4,
                name: 'Igor'
            }
        ]
    },
    { 
        id: 4,
        name: 'Igor',
        email: 'igor@test.com',
        friends: [
            {
                userId: 1,
                name: 'Nata'
            },
            {
                userId: 3,
                name: 'Alexandra'
            }
        ]
    },
    { 
        id: 5,
        name: 'John',
        email: 'john@test.com',
        friends: []
    },
    { 
        id: 6,
        name: 'Dima',
        email: 'dima@test.com',
        friends: [
            {
                userId: 1,
                name: 'Nata'
            }
        ]
    },
    { 
        id: 7,
        name: 'Alexnekot',
        email: 'alexnekot@test.com',
        friends: [
            {
                userId: 1,
                name: 'Nata'
            }
        ]
    }
];