// DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const pendingCount = document.getElementById('pendingCount');
const clearAllBtn = document.getElementById('clearAllBtn');

// Initialize tasks array from Local Storage, or set some initial defaults
let tasks = JSON.parse(localStorage.getItem('todo-tasks'));

if (!tasks || tasks.length === 0) {
    tasks = [
        { text: "Design custom QR code for Fiverr client", completed: false },
        { text: "Debug Sketchware Pro NullPointerException", completed: false },
        { text: "Write lyrics for new Nepali romantic track", completed: false }
    ];
    saveTasks(); // Save defaults right away
}

// Function to save to Local Storage
function saveTasks() {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
}

// Function to render tasks to the DOM
function renderTasks() {
    taskList.innerHTML = '';
    let pending = 0;

    tasks.forEach((task, index) => {
        if (!task.completed) pending++;

        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <button class="check-btn" onclick="toggleTask(${index})">
                <i class="fas ${task.completed ? 'fa-check-circle' : 'fa-circle'}"></i>
            </button>
            <span class="task-text" onclick="toggleTask(${index})">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        taskList.appendChild(li);
    });

    pendingCount.textContent = `${pending} task${pending !== 1 ? 's' : ''} pending`;
}

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert("Please enter a task first!");
        return;
    }

    tasks.push({ text: taskText, completed: false });
    taskInput.value = '';
    
    saveTasks();
    renderTasks();
}

// Function to toggle completion status
window.toggleTask = function(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Function to delete a task
window.deleteTask = function(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Function to clear all tasks
function clearAll() {
    if(tasks.length > 0 && confirm("Are you sure you want to delete all tasks?")) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
}

// Event Listeners
addBtn.addEventListener('click', addTask);
clearAllBtn.addEventListener('click', clearAll);

// Allow adding task with Enter key
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initial Render
renderTasks();