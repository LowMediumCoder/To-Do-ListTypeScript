"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaskService {
    constructor() {
        this.storageKey = 'tasks';
    }
    getTasks(userId) {
        const tasks = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        return tasks.filter(task => task.userId === Number(userId));
    }
    addTask(task) {
        const tasks = this.getAllTasks();
        tasks.push(task);
        localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }
    completeTask(taskId) {
        const tasks = this.getAllTasks();
        const task = tasks.find(t => t.id === Number(taskId));
        if (task) {
            task.status = 'completed';
            localStorage.setItem(this.storageKey, JSON.stringify(tasks));
        }
    }
    deleteTask(taskId) {
        const tasks = this.getAllTasks().filter(t => t.id !== Number(taskId));
        localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }
    getAllTasks() {
        return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    }
}
exports.default = new TaskService();
