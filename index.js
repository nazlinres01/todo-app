// express modülünü dahil ediyoruz
const express = require('express');
const app = express();
const PORT = 3000;

// JSON verilerini işlemesi için Express'e built-in middleware ekliyoruz
app.use(express.json());

// Basit bir veri modeli oluşturuyoruz
let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build a To-Do app', completed: false }
];

// Tüm görevleri listeleyen GET endpointi
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Yeni bir görev ekleyen POST endpointi
app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: req.body.completed || false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Bir görevi güncelleyen PUT endpointi
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  const todo = todos.find(t => t.id === parseInt(id));

  if (todo) {
    todo.task = task !== undefined ? task : todo.task;
    todo.completed = completed !== undefined ? completed : todo.completed;
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// Bir görevi silen DELETE endpointi
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex(t => t.id === parseInt(id));

  if (index !== -1) {
    const deletedTodo = todos.splice(index, 1);
    res.json(deletedTodo[0]);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// Sunucuyu başlatıyoruz
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
