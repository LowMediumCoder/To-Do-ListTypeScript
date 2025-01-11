export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'completed';
    deadline: string;
    userId: string; //ID of the user who created the task
}

export class TaskManager {
    private tasks: Task[] = [];

    constructor() {
        this.loadTasks();
    }

    private loadTasks() {
        const tasksJson = localStorage.getItem('tasks');
        if (tasksJson) {
            this.tasks = JSON.parse(tasksJson);
        }
    }

    public saveTasks() { 
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    public addTask(task: Task) {
        this.tasks.push(task)
        this.saveTasks();
    }

    public completeTask(taskId: string) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.status = 'completed';
            this.saveTasks();
        }
    }

    public deleteTask(taskId: string) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.saveTasks();
    }

    public getTasksByUser (userId: string): Task[] {
        return this.tasks.filter(t => t.userId === userId);
    }
}