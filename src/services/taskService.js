import * as taskRepository from '../repositories/taskRepo.js';

export async function getAllTasks() {
  return taskRepository.findAll();
}

export async function createTask(newTask) {
  return taskRepository.create(newTask);
}

// New service function for getting a single task by ID
export async function getTaskById(id) {
  return await taskRepository.getTaskById(id);
}