import { User } from './auth';

class AuthService {
    private storageKey = 'users';

    register(user: User): void {
        const users: User[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        users.push(user);
        localStorage.setItem(this.storageKey, JSON.stringify(users));
    }

    login(username: string, password: string): User | null {
        const users: User[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        return users.find(user => user.username === username && user.password === password) || null;
    }
}

export default new AuthService();