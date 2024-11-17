let tasks = []; // Array to store tasks

function addTask() {
  const name = document.getElementById("task-name").value;
  const category = document.getElementById("task-category").value;
  const reminder = document.getElementById("task-reminder").value;

  if (name === "") {
    alert("Task name is required!");
    return;
  }

  const task = {
    id: Date.now(),
    name,
    category,
    reminder,
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.innerHTML = `
      <h3>${task.name}</h3>
      <p>Category: ${task.category}</p>
      <p>Reminder: ${task.reminder}</p>
      <div class="actions">
        <button onclick="editTask(${task.id})">Edit</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    taskList.appendChild(taskDiv);
  });
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasks();
  renderTasks();
}

function editTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    document.getElementById("task-name").value = task.name;
    document.getElementById("task-category").value = task.category;
    document.getElementById("task-reminder").value = task.reminder;
    deleteTask(taskId); // Remove task while editing
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
}

// Initialize tasks on load
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const name = document.getElementById("task-name").value;
  const category = document.getElementById("task-category").value;
  const reminder = document.getElementById("task-reminder").value;

  if (name === "") {
    alert("Task name is required!");
    return;
  }

  const task = {
    id: Date.now(),
    name,
    category,
    reminder,
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  // Schedule notification
  if (reminder) {
    cordova.plugins.notification.local.schedule({
      id: task.id,
      title: "Task Reminder",
      text: `Reminder for: ${task.name}`,
      trigger: { at: new Date(reminder) },
    });
  }
}
