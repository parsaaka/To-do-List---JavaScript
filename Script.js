'use strict';

// ─── State ───
let tasks = loadTasks();

// ─── المان‌ها ───
const taskInput = document.querySelector('.taskInput');
const addBtn = document.querySelector('.addBtn');
const taskList = document.querySelector('.taskList');

// ─── localStorage ───
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem('tasks');
  return saved ? JSON.parse(saved) : [];
}

// ─── رندر ───
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    const actions = document.createElement('div');

    actions.classList.add('actions');
    li.classList.add('item');
    if (task.done) li.classList.add('done');
    li.dataset.id = task.id;

    span.textContent = task.text;
    editBtn.textContent = '✏️';
    deleteBtn.textContent = '❌';

    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTask(task.id);
    });

    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const newText = prompt('Edit Task', span.textContent);
      if (!newText) return;
      editTask(task.id, newText.trim());
    });

    actions.append(editBtn, deleteBtn);
    li.append(span, actions);
    taskList.appendChild(li);
  });
}

// ─── عملیات روی tasks ───
function addTask(text) {
  const task = {
    id: Date.now(),
    text,
    done: false,
  };
  tasks.push(task);
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  renderTasks();
}

function editTask(id, newText) {
  tasks = tasks.map((t) => (t.id === id ? { ...t, text: newText } : t));
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  saveTasks();
  renderTasks();
}

// ─── handleAddTask ───
function handleAddTask() {
  const text = taskInput.value.trim();
  if (!text) return;
  addTask(text);
  taskInput.value = '';
  taskInput.focus();
}

// ─── Event Listeners ───
addBtn.addEventListener('click', handleAddTask);

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleAddTask();
});

taskList.addEventListener('click', (e) => {
  const item = e.target.closest('.item');
  if (!item) return;
  if (e.target.tagName === 'SPAN') {
    toggleTask(Number(item.dataset.id));
  }
});

// ─── اول صفحه ───
renderTasks();
