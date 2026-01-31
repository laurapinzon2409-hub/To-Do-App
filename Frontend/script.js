const API_URL = 'http://localhost:3000/api/tasks';

const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const dueDateInput = document.getElementById('dueDate');
const sortSelect = document.getElementById('sortSelect');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const taskCounter = document.getElementById('taskCounter');

let tasks = [];
let editingTaskId = null;

async function fetchTasks() {
  const res = await fetch(API_URL);
  tasks = await res.json();
  renderTasks(tasks);
}

function renderTasks(data) {
  taskList.innerHTML = '';

  // 🔹 Contadores
  const total = data.length;
  const pending = data.filter(t => !t.isCompleted).length;
  taskCounter.textContent = `Total: ${total} | Pendientes: ${pending}`;

  data.forEach(task => {
    const li = document.createElement('li');

    // 🔹 Verificar si está vencida
    const isOverdue =
      task.dueDate &&
      !task.isCompleted &&
      new Date(task.dueDate) < new Date();

    // 🔹 Estados visuales
    if (task.isCompleted) {
      li.classList.add('completed');
    } else if (isOverdue) {
      li.classList.add('overdue');
    } else {
      li.classList.add('pending');
    }

    li.innerHTML = `
      <div>
        <strong>${task.title}</strong><br>
        ${task.description || ''}<br>
        <small>
          Creada: ${formatDate(task.createdAt)}<br>
          ${task.dueDate ? `Fecha límite: ${formatDate(task.dueDate)}<br>` : ''}
          ${task.completedAt ? `Realizada: ${formatDate(task.completedAt)}` : ''}
        </small>
      </div>

      <div class="actions">
        <button onclick="toggleTask(${task.id}, ${task.isCompleted})">✓</button>
        <button onclick="editTask(${task.id})">✏️</button>
        <button onclick="deleteTask(${task.id})">🗑</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

taskForm.addEventListener('submit', async e => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const dueDate = dueDateInput.value;

  if (!title || title.trim().length <= 3) {
  alert('El título es obligatorio y debe tener más de 3 caracteres');
  return;
}

  if (editingTaskId) {
    await fetch(`${API_URL}/${editingTaskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, dueDate })
    });
    editingTaskId = null;
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, dueDate })
    });
  }

  taskForm.reset();
  fetchTasks();
});

function editTask(id) {
  const task = tasks.find(t => t.id === id);

  titleInput.value = task.title;
  descriptionInput.value = task.description || '';
  dueDateInput.value = task.dueDate ? task.dueDate.split('T')[0] : '';

  editingTaskId = id;
}

async function toggleTask(id, completed) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isCompleted: !completed })
  });

  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchTasks();
}

searchInput.addEventListener('input', () => {
  const value = searchInput.value.trim().toLowerCase();

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(value)
  );

  renderTasks(filteredTasks);
  ''.includes('')
});

sortSelect.addEventListener('change', () => {
  let sortedTasks = [...tasks];

  if (sortSelect.value === 'due') {
    sortedTasks.sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  } else {
    sortedTasks.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }

  renderTasks(sortedTasks);
});

clearCompletedBtn.addEventListener('click', async () => {
  const completedTasks = tasks.filter(t => t.isCompleted);

  for (const task of completedTasks) {
    await fetch(`${API_URL}/${task.id}`, { method: 'DELETE' });
  }

  fetchTasks();
});

//Fechas

function formatDate(date) {
  return new Date(date).toLocaleDateString('es-CO');
}

fetchTasks();
