interface Task {
    id: number;
    title: string;
    description: string;
    status: 'pending' | 'completed';
    deadline: Date;
    userId: string;
}

class User {
    constructor(public username: string) {}
}

class TodoApp {
    private tasks: Task[] = [];
    private currentUser:  User | null = null;
    private taskIdCounter: number = 0;

    constructor() {
        this.init();
    }

    private init() {
        document.getElementById('signup')!.addEventListener('click', () => this.signup());
        document.getElementById('login')!.addEventListener('click', () => this.login());
        document.getElementById('add-task')!.addEventListener('click', () => this.addTask());
    }

    private signup() {
        const usernameInput = document.getElementById('username') as HTMLInputElement;
        const username = usernameInput.value.trim();
        if (username) {
            this.currentUser  = new User(username);
            this.showTaskForm();
        }
    }

    private login() {
        const usernameInput = document.getElementById('username') as HTMLInputElement;
        const username = usernameInput.value.trim();
        if (username) {
            this.currentUser  = new User(username);
            this.showTaskForm();
        }
    }

    private showTaskForm() {
        document.getElementById('auth')!.style.display = 'none';
        document.getElementById('task-form')!.style.display = 'block';
        this.renderTasks();
    }

    private addTask() {
        const titleInput = document.getElementById('task-title') as HTMLInputElement;
        const descriptionInput = document.getElementById('task-description') as HTMLTextAreaElement;
        const deadlineInput = document.getElementById('task-deadline') as HTMLInputElement;

        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const deadline = new Date(deadlineInput.value);

        if (title && description && !isNaN(deadline.getTime())) {
            const newTask: Task = {
                id: this.taskIdCounter++,
                title,
                description,
                status: 'pending',
                deadline,
                userId: this.currentUser !.username
            };
            this.tasks.push(newTask);
            this.renderTasks();
            titleInput.value = '';
            descriptionInput.value = '';
            deadlineInput.value = '';
        }
    }

    private renderTasks() {
        const taskList = document.getElementById('task-list')!;
        taskList.innerHTML = ''; // Réinitialisez la liste des tâches
    
        this.tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            taskElement.innerHTML = `
                <h3>${task.title} <small>(Deadline: ${task.deadline.toLocaleDateString()})</small></h3>
                <p>${task.description}</p>
                <p>Status: ${task.status}</p>
                <button onclick="app.validateTask(${task.id})">Valider</button>
                ${task.status === 'pending' ? `<button onclick="app.deleteTask(${task.id})">Supprimer</button>` : ''}
            `;
            taskList.appendChild(taskElement); // Ajoutez l'élément de tâche à la liste
        });
    }

    public validateTask(taskId: number) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task && task.status === 'pending') {
            task.status = 'completed';
            this.renderTasks();
        }
    }

    public deleteTask(taskId: number) {
        const taskIndex = this.tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1 && this.tasks[taskIndex].status === 'pending') {
            this.tasks.splice(taskIndex, 1);
            this.renderTasks();
        }
    }
}

const app = new TodoApp();