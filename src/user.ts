export interface User {
    username: string;
    password: string;
}

export class UserManager {
    private users: User[] = [];

    constructor() {
        this.loadUsers();
    }

    private loadUsers() {
        const usersJson = localStorage.getItem('users');
        if (usersJson) {
            this.users = JSON.parse(usersJson);
        }
    }

    public saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    public register(username: string, password: string): boolean {
        if (this.users.find(user => user.username === username)) {
            return false;
        }
        this.users.push({ username, password });
        this.saveUsers();
        return true;
    }

    public login(username: string, password: string): boolean {
        return this.users.some(user => user.username === username && user.password === password);
    }
}