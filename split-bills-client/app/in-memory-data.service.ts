import { InMemoryDbService } from 'angular-in-memory-web-api';

import { SplitType } from './secure-app/bills/split-type';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let users = [
            { 
                id: 1, 
                name: 'Nata', 
                email: 'nata@test.com',
                password: 'testpwd1',
                isReal: true,
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
                    },
                    {
                        userId: 8,
                        name: 'Test'
                    }
                ]
            },
            { 
                id: 2,
                name: 'Alex',
                email: 'alex@test.com',
                password: 'testpwd1',
                isReal: true,
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
                password: 'testpwd1',
                isReal: true,
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
                password: 'testpwd1',
                isReal: true,
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
                password: 'testpwd1',
                isReal: true,
                friends: []
            },
            { 
                id: 6,
                name: 'Dima',
                email: 'dima@test.com',
                password: 'testpwd1',
                isReal: true,
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
                password: 'testpwd1',
                isReal: true,
                friends: [
                    {
                        userId: 1,
                        name: 'Nata'
                    }
                ]
            },
            {
                id: 8,
                name: 'Test',
                email: '',
                password: '',
                isReal: false,
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
            }
        ];

        let groups = [
            {
                id: 1,
                name: 'Belgium trip',
                friends: [
                    {
                        userId: 1,
                        name: 'Nata',
                        email: 'nata@test.com'
                    },
                    {
                        userId: 3,
                        name: 'Alexandra' ,
                        email: 'alexandra@test.com'
                    },
                    {
                        userId: 4,
                        name: 'Igor',
                        email: 'igor@test.com'
                    },
                    {
                        userId: 8,
                        name: 'Test'
                    }
                ]
            },
            {
                id: 2,
                name: 'Vilnius trip',
                friends: [
                    {
                        userId: 1,
                        name: 'Nata',
                        email: 'nata@test.com'
                    },
                    {
                        userId: 2,
                        name: 'Alex',
                        email: 'alex@test.com'
                    }
                ]
            },
            {
                id: 3,
                name: 'Italy trip',
                friends: [
                    {
                        userId: 1,
                        name: 'Nata',
                        email: 'nata@test.com'
                    },
                    {
                        userId: 7,
                        name: 'Alexnekot',
                        email: 'alexnekot@test.com'
                    }
                ]
            },
            {
                id: 4,
                name: 'Unkown trip',
                friends: [
                    {
                        userId: 7,
                        name: 'Alexnekot',
                        email: 'alexnekot@test.com'
                    }
                ]
            }
        ];

        let bills = [
            {
                id: 1,
                description: 'Apartments',
                amount: 100,
                groupId: 3,
                paidBy: 1,
                splitType: SplitType.Equal,
                debtors: [
                    {
                        userId: 1,
                        amount: 50
                    },
                    {
                        userId: 7,
                        amount: 50
                    }
                ]
            },
            {
                id: 2,
                description: 'Train',
                amount: 50,
                groupId: 3,
                paidBy:7,
                splitType: SplitType.Equal,
                debtors: [
                    {
                        userId: 1,
                        amount: 25
                    },
                    {
                        userId: 7,
                        amount: 25
                    }
                ]
            },
            {
                id: 3,
                description: 'Hostel Brussels',
                amount: 184,
                groupId: 1,
                paidBy:3,
                splitType: SplitType.Equal,
                debtors: [
                    {
                        userId: 1,
                        amount: 46
                    },
                    {
                        userId: 3,
                        amount: 46
                    },
                    {
                        userId: 4,
                        amount: 46
                    },
                    {
                        userId: 8,
                        amount: 46
                    }
                ]
            },
            {
                id: 4,
                description: 'Bars',
                amount: 15,
                groupId: 1,
                paidBy: 8,
                splitType: SplitType.Equal,
                debtors: [
                    {
                        userId: 1,
                        amount: 3.75
                    },
                    {
                        userId: 3,
                        amount: 3.75
                    },
                    {
                        userId: 4,
                        amount: 3.75
                    },
                    {
                        userId: 8,
                        amount: 3.75
                    }
                ]
            },
            {
                id: 5,
                description: 'Lunch',
                amount: 20,
                groupId: 1,
                paidBy: 1,
                splitType: SplitType.Equal,
                debtors: [
                    {
                        userId: 1,
                        amount: 5
                    },
                    {
                        userId: 3,
                        amount: 5
                    },
                    {
                        userId: 4,
                        amount: 5
                    },
                    {
                        userId: 8,
                        amount: 5
                    }
                ]
            },
            {
                id: 6,
                description: 'Dinner',
                amount: 40,
                groupId: 1,
                paidBy: 4,
                splitType: SplitType.Equal,
                debtors: [
                    {
                        userId: 1,
                        amount: 10
                    },
                    {
                        userId: 3,
                        amount: 10
                    },
                    {
                        userId: 4,
                        amount: 10
                    },
                    {
                        userId: 8,
                        amount: 10
                    }
                ]
            },
            {
                id: 7,
                description: 'Beer museum',
                amount: 20,
                groupId: 1,
                paidBy: 4,
                splitType: SplitType.Equal,
                debtors: [
                    {
                        userId: 1,
                        amount: 5
                    },
                    {
                        userId: 3,
                        amount: 5
                    },
                    {
                        userId: 4,
                        amount: 5
                    },
                    {
                        userId: 8,
                        amount: 5
                    }
                ]
            },
            {
                id: 8,
                description: 'Hostel Brugge',
                amount: 84,
                groupId: 1,
                paidBy: 3,
                splitType: SplitType.Equal,
                debtors: [
                    {
                        userId: 1,
                        amount: 21
                    },
                    {
                        userId: 3,
                        amount: 21
                    },
                    {
                        userId: 4,
                        amount: 21
                    },
                    {
                        userId: 8,
                        amount: 21
                    }
                ]
            }
        ];

        return {users, groups, bills};
    }
}