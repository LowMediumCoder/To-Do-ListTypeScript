"use strict";
class User {
    constructor(username) {
        this.username = username;
    }
}
class TodoApp {
    constructor() {
        this.tasks = [];
        this.currentUser = null;
        this.taskIdCounter = 0;
        this.init();
    }
    init() {
        document.getElementById('signup').addEventListener('click', () => this.signup());
        document.getElementById('login').addEventListener('click', () => this.login());
        document.getElementById('add-task').addEventListener('click', () => this.addTask());
    }
    signup() {
        const usernameInput = document.getElementById('username');
        const username = usernameInput.value.trim();
        if (username) {
            this.currentUser = new User(username);
            this.showTaskForm();
        }
    }
    login() {
        const usernameInput = document.getElementById('username');
        const username = usernameInput.value.trim();
        if (username) {
            this.currentUser = new User(username);
            this.showTaskForm();
        }
    }
    showTaskForm() {
        document.getElementById('auth').style.display = 'none';
        document.getElementById('task-form').style.display = 'block';
        this.renderTasks();
    }
    addTask() {
        const titleInput = document.getElementById('task-title');
        const descriptionInput = document.getElementById('task-description');
        const deadlineInput = document.getElementById('task-deadline');
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const deadline = new Date(deadlineInput.value);
        if (title && description && !isNaN(deadline.getTime())) {
            const newTask = {
                id: this.taskIdCounter++,
                title,
                description,
                status: 'pending',
                deadline,
                userId: this.currentUser.username
            };
            this.tasks.push(newTask);
            this.renderTasks();
            titleInput.value = '';
            descriptionInput.value = '';
            deadlineInput.value = '';
        }
    }
    renderTasks() {
        const taskList = document.getElementById('task-list');
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
    validateTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task && task.status === 'pending') {
            task.status = 'completed';
            this.renderTasks();
        }
    }
    deleteTask(taskId) {
        const taskIndex = this.tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1 && this.tasks[taskIndex].status === 'pending') {
            this.tasks.splice(taskIndex, 1);
            this.renderTasks();
        }
    }
}
const app = new TodoApp();
