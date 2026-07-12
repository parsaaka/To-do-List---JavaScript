'use strict';

const taskInput = document.querySelector('.taskInput');
const addBtn = document.querySelector('.addBtn');
const taskList = document.querySelector('.taskList');

function addTask(text) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const editBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
  const actions = document.createElement('div');
  actions.classList.add('actions');
  li.classList.add('item');
  span.textContent = text;
  editBtn.textContent = '✏️';
  deleteBtn.textContent = '❌';

  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
  });
  editBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const newText = prompt('Edit Task', span.textContent);
    if (!newText) return;
    span.textContent = newText.trim();
  });

  actions.append(editBtn, deleteBtn);
  li.append(span, actions);
  taskList.appendChild(li);
}

function handleAddTask() {
  const text = taskInput.value.trim();
  if (!text) return;
  addTask(text);
  taskInput.value = '';
  taskInput.focus();
}

addBtn.addEventListener('click', handleAddTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleAddTask();
  }
});

taskList.addEventListener('click', (e) => {
  const item = e.target.closest('.item');

  if (!item) return;

  item.classList.toggle('done');
});
