const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const priorityInput = document.getElementById('priorityInput');
const dueDateInput = document.getElementById('dueDateInput');
const taskList = document.getElementById('taskList');

let currentDate = new Date();
let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Global task array

// Load tasks from local storage and generate calendar on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    generateCalendar();
});

addTaskBtn.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    const priority = priorityInput.value;
    const dueDate = dueDateInput.value;

    if (taskText && priority && dueDate) {
        addTask(taskText, priority, dueDate);
        taskInput.value = '';
        priorityInput.selectedIndex = 0;
        dueDateInput.value = '';
        saveTasks();
        generateCalendar(); // Regenerate calendar after adding task
    } else {
        alert("Please enter a task, select a priority, and choose a due date.");
    }
});

function addTask(taskText, priority, dueDate) {
    const task = { text: taskText, priority: priority, dueDate: dueDate, completed: false };
    tasks.push(task); // Add the task to the global tasks array

    // Create the task list element
    const li = document.createElement('li');
    li.setAttribute('data-task-text', taskText);
    li.setAttribute('data-priority', priority);
    li.setAttribute('data-due-date', dueDate);
    li.innerHTML = `<span>${taskText} - ${priority} ${dueDate ? '(Due by ' + new Date(dueDate).toLocaleDateString('en-CA') + ')' : ''}</span>`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove');
    removeBtn.innerHTML = `<span class="icon">🗑️</span>${removeBtn.textContent}`;

    removeBtn.onclick = () => {
        li.remove();
        // Filter out the removed task from the tasks array
        tasks = tasks.filter(task => task.text !== taskText || task.dueDate !== dueDate);
        saveTasks();
        generateCalendar(); // Regenerate the calendar after removing task
    };

    li.appendChild(removeBtn);

    li.addEventListener('click', () => li.classList.toggle('completed'));

    taskList.appendChild(li);
}

function saveTasks() {
    // Save the updated tasks array to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    // Clear the task list before loading tasks
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.setAttribute('data-task-text', task.text);
        li.setAttribute('data-priority', task.priority);
        li.setAttribute('data-due-date', task.dueDate);
        li.innerHTML = `<span>${task.text} - ${task.priority} ${task.dueDate ? '(Due by ' + new Date(task.dueDate).toLocaleDateString('en-CA') + ')' : ''}</span>`;
        if (task.completed) li.classList.add('completed');

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove');
        removeBtn.innerHTML = `<span class="icon">🗑️</span>${removeBtn.textContent}`;
        removeBtn.onclick = () => {
            li.remove();
            // Filter out the removed task from the tasks array
            tasks = tasks.filter(t => t.text !== li.getAttribute('data-task-text') || t.dueDate !== li.getAttribute('data-due-date'));
            saveTasks();
            generateCalendar(); // Regenerate the calendar after removing task
        };

        li.appendChild(removeBtn);
        li.addEventListener('click', () => li.classList.toggle('completed'));

        taskList.appendChild(li);
    });
}

function generateCalendar() {
    const calendarEl = document.getElementById("calendar");
    calendarEl.innerHTML = ""; // Clear previous calendar

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    document.getElementById("currentMonth").textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    let firstDayIndex = new Date(year, month, 1).getDay();
    let lastDayIndex = new Date(year, month + 1, 0).getDate();

    // Generate empty spaces before the first day of the month
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.classList.add("day");
        calendarEl.appendChild(emptyDiv);
    }

    // Create the days of the current month
    for (let i = 1; i <= lastDayIndex; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        dayDiv.textContent = i;

        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

        // Get tasks for the current date
        const tasksForDate = tasks.filter(task => task.dueDate === dateKey);
        if (tasksForDate.length > 0) {
            dayDiv.classList.add("has-tasks");
        }

        dayDiv.onclick = () => {
            const tasksText = tasksForDate.map(task => `- ${task.text} (${task.priority})`).join('\n');
            const taskTextPrompt = prompt(`Tasks for ${i}/${month + 1}/${year}:\n\n` + tasksText + "\n\nEnter your task:");
            if (taskTextPrompt) {
                addTask(taskTextPrompt, "Low", dateKey);
                saveTasks();
                generateCalendar(); // Regenerate calendar after adding task
            }
        };

        calendarEl.appendChild(dayDiv);
    }
}

function changeMonth(offset) {
    currentDate.setMonth(currentDate.getMonth() + offset);
    generateCalendar();
}

document.getElementById("prevMonthBtn").onclick = () => changeMonth(-1);
document.getElementById("nextMonthBtn").onclick = () => changeMonth(1);
