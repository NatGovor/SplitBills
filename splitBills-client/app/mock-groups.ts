import { Group } from './group';

export const GROUPS: Group[] = [
    {
        id: 1,
        name: 'Belgium trip',
        friends: [
            {
                userId: 1,
                name: 'Nata'
            },
            {
                userId: 3,
                name: 'Alexandra' 
            },
            {
                userId: 4,
                name: 'Igor'
            }
        ]
    },
    {
        id: 2,
        name: 'Vilnius trip',
        friends: [
            {
                userId: 1,
                name: 'Nata'
            },
            {
                userId: 2,
                name: 'Alex'
            }
        ]
    },
    {
        id: 3,
        name: 'Italy trip',
        friends: [
            {
                userId: 1,
                name: 'Nata'
            },
            {
                userId: 7,
                name: 'Alexnekot'
            }
        ]
    }
];