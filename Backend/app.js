const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const taskRoutes = require('./routes/tasks.routes');
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('API To-Do funcionando 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


