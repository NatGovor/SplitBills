export class Friend {
    name: string;
    userId: number;
    email: string;

    constructor(name: string, userId: number, email?: string) {
        this.name = name;
        this.userId = userId;
        this.email = email;
    }
}
