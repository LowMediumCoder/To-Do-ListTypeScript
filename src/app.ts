import { Task, TaskManager } from './task';
import { UserManager } from './user';

const userManager = new UserManager();
const taskManager = new TaskManager();

let currentUser: string | null = null;

// Function for login/ register form
const signupButton = document.getElementById('signup') as HTMLButtonElement;
const loginButton = document.getElementById('login') as HTMLButtonElement;
const addTaskButton = document.getElementById('add-task') as HTMLButtonElement;
const taskListElement = document.getElementById('task-list') as HTMLUListElement;
const taskSection = document.getElementById('task-section') as HTMLDivElement;

signupButton.addEventListener('click', () => {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    if (userManager.register(username, password)) {
        alert('User registered successfully');
    } else {
        alert('User already exists');
    }
});
