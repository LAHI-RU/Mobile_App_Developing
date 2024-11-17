// Array to store tasks
let tasks = [];

// Add a new task
function addTask() {
  const taskName = document.getElementById("task-name").value.trim();
  const taskCategory = document.getElementById("task-category").value;

  if (taskName === "") {
    alert("Task name cannot be empty!");
    return;
  }

  const task = {
    id: Date.now(),
    name: taskName,
    category: taskCategory,
  };

  tasks.push(task);
  renderTasks();
  clearInput();
}

// Render tasks dynamically
function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskCard = document.createElement("div");
    taskCard.className = "card";

    taskCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${task.name}</h5>
        <p class="card-text"><strong>Category:</strong> ${task.category}</p>
        <div class="d-flex justify-content-between">
          <button class="btn btn-warning btn-sm" onclick="updateTask(${task.id})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
        </div>
      </div>
    `;
    taskList.appendChild(taskCard);
  });
}

// Delete a task
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
}

// Update a task
function updateTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    const newName = prompt("Update Task Name:", task.name);
    if (newName) {
      task.name = newName.trim();
      renderTasks();
    }
  }
}

// Clear input fields
function clearInput() {
  document.getElementById("task-name").value = "";
  document.getElementById("task-category").value = "Work";
}

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
});
