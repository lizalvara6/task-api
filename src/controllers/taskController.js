import * as taskService from '../services/taskService.js';

export async function getTasks(req, res, next) {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
}

export async function createTask(req, res, next) {
  const { title, completed } = req.body;
  const task = await taskService.createTask({ title, completed });
  res.status(201).json(task);
}

// New controller function for getting a single task by ID
export async function getTaskById(req, res, next) {
  const id = parseInt(req.params.id, 10);

  // Validate ID
  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: 'Validation failed',
      details: ['ID must be a number']
    });
  }

  try {
    const task = await taskService.getTaskById(id);

    // If task not found, return 404
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // 200 OK
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}
