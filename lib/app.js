"use strict";
class TaskService {
    constructor() {
        this.storageKey = 'tasks';
    }
    getTasks() {
        return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    }
    addTask(task) {
        const tasks = this.getTasks();
        tasks.push(task);
        localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }
    deleteTask(taskId) {
        const tasks = this.getTasks().filter(task => task.id !== taskId);
        localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }
    toggleTaskCompletion(taskId) {
        const tasks = this.getTasks();
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed; // Toggle the completed status
            localStorage.setItem(this.storageKey, JSON.stringify(tasks));
        }
    }
}
const taskService = new TaskService();
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const errorMessage = document.getElementById('error-message'); // Assuming you have a div for error messages
const completedTaskList = document.getElementById('completed-task-list'); // Assuming you have a UL for completed tasks
addTaskButton.addEventListener('click', () => {
    const titleInput = document.getElementById('task-title');
    const descriptionInput = document.getElementById('task-description');
    const deadlineInput = document.getElementById('task-deadline');
    // Clear previous error message
    errorMessage.textContent = '';
    // Validate title and description
    if (!titleInput.value.trim()) {
        errorMessage.textContent = 'Title is required.';
        return;
    }
    if (!descriptionInput.value.trim()) {
        errorMessage.textContent = 'Description is required.';
        return;
    }
    if (!deadlineInput.value.trim()) {
        errorMessage.textContent = 'Deadline is required.';
        return;
    }
    const task = {
        id: new Date().toISOString(),
        title: titleInput.value,
        description: descriptionInput.value,
        completed: false, // Initialize completed status to false
        deadline: deadlineInput.value
    };
    // Add the task to the TaskService
    taskService.addTask(task);
    // Clear the input fields
    titleInput.value = '';
    descriptionInput.value = '';
    deadlineInput.value = '';
    // Refresh the task list
    displayTasks();
});
// Function to display tasks
function displayTasks() {
    // Clear the current task list
    taskList.innerHTML = '';
    // Get tasks from the TaskService
    const tasks = taskService.getTasks();
    // Render each task
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        // Update the textContent to include the title and description
        listItem.textContent = `${task.title} - ${task.description} - Deadline: ${task.deadline}`;
        // Create a checkbox to mark the task as complete
        const completeCheckbox = document.createElement('input');
        completeCheckbox.type = 'checkbox';
        completeCheckbox.checked = task.completed; // Set checkbox state based on task completion
        completeCheckbox.addEventListener('change', () => {
            taskService.toggleTaskCompletion(task.id);
            displayTasks(); // Refresh the task list to reflect changes
        });
        // Append the checkbox to the list item
        listItem.appendChild(completeCheckbox);
        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            taskService.deleteTask(task.id);
            displayTasks();
        });
        // Append the delete button to the list item
        listItem.appendChild(deleteButton);
        if (task.completed) {
            completedTaskList.appendChild(listItem);
        }
        else {
            taskList.appendChild(listItem); // Append the list item to the task list
        }
    });
}
// Display tasks on initial load
displayTasks();
