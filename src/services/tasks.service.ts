import {
  getAllTasks,
  getTaskById,
  createdTask,
  updateTaskById,
  deleteTaskById,
  getTaskByUser,
} from "../repositories/mongoose/task.repository";
import { Task } from "../interfaces/task.interface";

export const listAllTasks = async () => {
  const tasks = await getAllTasks();
  return tasks;
};

export const callTask = async (id: string) => {
  const task = await getTaskById(id);
  return task;
};

export const registerTask = async (task: Task) => {
  const newTask = await createdTask(task);
  return newTask;
};

export const actualizeTask = async (id: string, task: Task) => {
  const updateTask = await updateTaskById(id, task);
  return updateTask;
};

export const removeTask = async (id: string) => {
  const deleteTask = await deleteTaskById(id);
  return deleteTask;
};

export const listAllTaskByUser = async (id: string) => {
  const tasks = await getTaskByUser(id);
  return tasks;
};
