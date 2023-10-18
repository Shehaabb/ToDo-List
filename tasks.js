import { saveTasks, getTasks } from './local-storage.js';

function createTask(title) {
    if (!title) return; 

    const newTask = { id: Date.now(), title, completed: false, createdAt: new Date().toISOString() };
    const allTasks = getTasks();
    allTasks.push(newTask);
    saveTasks(allTasks);   
    return newTask;
}

function renderTask(task, taskList) {
    const taskItem = document.createElement('li');
    taskItem.dataset.id = task.id;

    const taskHTML = `
        <div class="column">
            <span class="${task.completed ? 'completed' : ''}">${task.title}</span>
            <span class="date">${getFormattedDate()}</span>
        </div>
        <input type="checkbox" id="task-${task.id}" class="custom-checkbox" ${task.completed ? 'checked' : ''}>
        <label for="task-${task.id}" class="custom-label"></label>
    `;
    taskItem.innerHTML = taskHTML;
    taskList.appendChild(taskItem); 
}

function getFormattedDate() {const date = new Date();

    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 

    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = date.getMinutes().toString().padStart(2, '0');
    const secondsStr = date.getSeconds().toString().padStart(2, '0');
    
    const dayStr = date.getDate().toString().padStart(2, '0');
    const monthStr = (date.getMonth() + 1).toString().padStart(2, '0');
    const yearStr = date.getFullYear();

    return `${hoursStr}:${minutesStr}:${secondsStr}${ampm}, ${dayStr}/${monthStr}/${yearStr}`;
}

function toggleTaskCompletion(event) {
    const clickedItem = event.target;
    if (clickedItem.matches('.custom-checkbox')) {
        const taskElement = clickedItem.closest('li');
        const taskId = Number(taskElement.dataset.id);
        const allTasks = getTasks();
        const taskIndex = allTasks.findIndex(task => task.id === taskId);

        if (taskIndex > -1) {
            allTasks[taskIndex].completed = clickedItem.checked;
            saveTasks(allTasks); 
            
            const titleElement = taskElement.querySelector('span');
            if (allTasks[taskIndex].completed) {
                titleElement.classList.add('completed');
            } else {
                titleElement.classList.remove('completed');
            }
        }
    }
}

export { createTask, renderTask, getFormattedDate, toggleTaskCompletion };
