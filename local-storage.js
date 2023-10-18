function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

export { saveTasks, getTasks };
