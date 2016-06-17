export class InMemoryDataService {
    createDb() {
        let friends = [
            { "id": 1, "name": "John" },
            { "id": 2, "name": "Bill" },
            { "id": 3, "name": "Anna" },
            { "id": 4, "name": "Sam" },
            { "id": 5, "name": "Kate" }            
        ];
        return {friends};
    }
}