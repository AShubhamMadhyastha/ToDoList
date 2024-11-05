# Task Manager with Calendar

This project is a **Task Manager with Calendar** that allows users to add tasks, set priorities, and associate due dates with specific days on a calendar. Tasks are displayed on the calendar, and the app uses **localStorage** to persist tasks across page reloads.

## Features:
- Add tasks with a description, priority, and due date.
- View tasks on a calendar interface.
- Mark tasks as completed.
- Remove tasks from the list.
- Tasks are saved to **localStorage** and persist across page reloads.
- The calendar view is dynamically updated when tasks are added or removed.

## Technologies Used:
- **HTML**: Structure and elements for the task manager and calendar.
- **CSS**: Basic styling for the user interface.
- **JavaScript**: Core functionality for managing tasks, calendar generation, and data persistence with localStorage.

## How to Use:
1. **Add a Task**:  
   Enter a task description, select a priority (e.g., "Low", "Medium", "High"), and choose a due date. Then, click the **Add Task** button to save the task.

2. **View the Calendar**:  
   The current month’s calendar is displayed. Tasks that are due on a specific day are highlighted. You can click on a day to view and add tasks for that date.

3. **Remove a Task**:  
   To remove a task, click the "🗑️" button next to the task. The task will be removed from the list and the calendar.

4. **Mark a Task as Completed**:  
   Click on any task to toggle its completion status. Completed tasks are visually marked (e.g., by striking through).

5. **Persistence**:  
   Your tasks will be saved in the browser’s **localStorage**, meaning they will persist even after you refresh the page.

## Installation:

You can clone this repository or download the project files directly.

### Clone the repository:
```bash
git clone https://github.com/your-username/your-repo-name.git
