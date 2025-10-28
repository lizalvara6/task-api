import prisma from '../config/db.js';

export async function findAll() {
  return prisma.task.findMany();
}

// Create a new task
export async function create(data) {
  return prisma.task.create({
    data,
  });
}

// New repository function for getting a single task by ID
export async function getTaskById(id) {
  return await prisma.task.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      completed: true,
    }
  });
}