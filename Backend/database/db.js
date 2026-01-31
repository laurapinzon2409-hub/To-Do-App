const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'tasks.db');

const db = new sqlite3.Database(dbPath, err => {
  if (err) {
    console.error('Error SQLite:', err);
  } else {
    console.log('Conectado a SQLite');
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    isCompleted INTEGER DEFAULT 0,
    createdAt TEXT,
    completedAt TEXT,
    dueDate TEXT
  )
`);

module.exports = db;