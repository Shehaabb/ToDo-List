import { createTask, renderTask, toggleTaskCompletion } from './tasks.js';
import { getTasks } from './local-storage.js';

const taskInput = document.getElementById('taskInput');
const createTaskButton = document.getElementById('createTaskButton');
const taskList = document.getElementById('taskList');
const filters = document.querySelectorAll('.filter');

createTaskButton.addEventListener('click', () => {
    const title = taskInput.value.trim();
    const task = createTask(title);
    renderTask(task, taskList);
    taskInput.value = '';
});

filters.forEach(filter => {
    filter.addEventListener('click', applyFilter);
});

function applyFilter(e) {
    const filter = e.target.dataset.filter;
    const tasks = getTasks(); 

    taskList.innerHTML = '';

    let filteredTasks = [];
    if (filter === 'all') {
        filteredTasks = tasks;
    } else if (filter === 'todo') {
        filteredTasks = tasks.filter(t => !t.completed);
    } else {
        filteredTasks = tasks.filter(t => t.completed);
    }

    filteredTasks.forEach(task => renderTask(task, taskList));  
    filters.forEach(filter => {
        filter.classList.remove('selected');
    });
    e.target.classList.add('selected');
}
document.addEventListener('change', (event) => {
    if (event.target.matches('.custom-checkbox')) {
        toggleTaskCompletion(event, taskList); 
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const tasks = getTasks();
    tasks.forEach(task => renderTask(task, taskList));
});
