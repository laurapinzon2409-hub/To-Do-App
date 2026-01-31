const db = require('../database/db');

const getAllTasks = (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener tareas' });
    }
    res.status(200).json(rows);
  });
};

const getTaskById = (req, res) => {
  const id = req.params.id;

  db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Error al buscar tarea' });
    }

    if (!row) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.status(200).json(row);
  });
};

const createTask = (req, res) => {
  console.log('BODY RECIBIDO:', req.body);

  let { title, description, dueDate } = req.body;

   if (!title || typeof title !== 'string' || title.trim().length <= 3) {
    return res.status(400).json({
      message: 'El título es obligatorio y debe tener más de 3 caracteres'
    });

  }

  title = title.trim();
  description = description ? description.trim() : '';

  const createdAt = new Date().toISOString();

  db.run(
    `
    INSERT INTO tasks (title, description, createdAt, dueDate)
    VALUES (?, ?, ?, ?)
    `,
    [title, description, createdAt, dueDate || null],
    function (err) {
      if (err) {
        console.error('ERROR SQLITE:', err);
        return res.status(500).json({
          message: 'Error al crear la tarea'
        });
      }

      res.status(201).json({
        id: this.lastID,
        title,
        description,
        isCompleted: 0,
        createdAt,
        dueDate: dueDate || null
      });
    }
  );
};

const updateTask = (req, res) => {
  const id = req.params.id;
  const { title, description, isCompleted, dueDate } = req.body;

  let completedAt = null;

  if (isCompleted === true) {
    completedAt = new Date().toISOString();
  }

  db.run(
    `
    UPDATE tasks
    SET
      title = COALESCE(?, title),
      description = COALESCE(?, description),
      isCompleted = COALESCE(?, isCompleted),
      completedAt = COALESCE(?, completedAt),
      dueDate = COALESCE(?, dueDate)
    WHERE id = ?
    `,
    [title, description, isCompleted, completedAt, dueDate, id],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'Error al actualizar tarea' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
      }

      res.status(200).json({ message: 'Tarea actualizada correctamente' });
    }
  );
};

const deleteTask = (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Error al eliminar tarea' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.status(204).send();
  });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
