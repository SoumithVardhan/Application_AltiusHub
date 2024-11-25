const express = require('express');
const cors = require('cors');

// MongoDB Connection
mongoose.connect('URL', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1); // Exit the process if DB connection fails
});

const app = express();
app.use(cors());
app.use(express.json());


// Create Task
app.post('/tasks', async (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  const task = await prisma.task.create({
    data: { title, description, priority, dueDate: new Date(dueDate) },
  });
  res.json(task);
});


// Get All Tasks
app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});


// Update Task
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, dueDate } = req.body;
  const updatedTask = await prisma.task.update({
    where: { id: parseInt(id) },
    data: { title, description, priority, dueDate: new Date(dueDate) },
  });
  res.json(updatedTask);
});

// Delete Task
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.task.delete({ where: { id: parseInt(id) } });
  res.json({ message: 'Task deleted successfully' });
});

// Port number 
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
