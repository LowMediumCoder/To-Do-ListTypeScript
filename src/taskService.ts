import { Task } from './task';

class TaskService {
    private storageKey = 'tasks';

    getTasks(userId: string): Task[] {
        const tasks: Task[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        return tasks.filter(task => task.userId === Number(userId));
    }

    addTask(task: Task): void {
        const tasks = this.getAllTasks();
        tasks.push(task);
        localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }

    completeTask(taskId: string): void {
        const tasks = this.getAllTasks();
        const task = tasks.find(t => t.id === Number(taskId));
        if (task) {
            task.status = 'completed';
            localStorage.setItem(this.storageKey, JSON.stringify(tasks));
        }
    }

    deleteTask(taskId: string): void {
        const tasks = this.getAllTasks().filter(t => t.id !== Number(taskId));
        localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }

    private getAllTasks(): Task[] {
        return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    }
}

export default new TaskService();