import { Request, Response } from "express";
import { ErrorExt, HttpResponse, handleError } from "@/utils/http.response.util";
import {
  listAllTaskByUser,
  actualizeTask,
  removeTask,
  callTask,
  registerTask,
} from "@/services/tasks.service";
import { Task } from "@/interfaces/entities/task.interface";

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const user = req.user;

  try {
    const tasks = await listAllTaskByUser(user.id);
    HttpResponse.Ok(res, tasks);
  } catch (err) {
    if (err instanceof ErrorExt) {
      handleError.call(res, err);
    } else {
      HttpResponse.Error(res, err);
    }
  }
};

export const getTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const task = await callTask(id);
    HttpResponse.Ok(res, task);
  } catch (err) {
    if (err instanceof ErrorExt) {
      handleError.call(res, err);
    } else {
      HttpResponse.Error(res, err);
    }
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const task: Task = req.body;
  const user = req.user;
  task.user = user.id;
  try {
    const newTask = await registerTask(task);

    HttpResponse.Ok(res, newTask);
  } catch (err) {
    if (err instanceof ErrorExt) {
      handleError.call(res, err);
    } else {
      HttpResponse.Error(res, err);
    }
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const task = await removeTask(id);
    HttpResponse.Ok(res, task);
  } catch (err) {
    if (err instanceof ErrorExt) {
      handleError.call(res, err);
    } else {
      HttpResponse.Error(res, err);
    }
  }
};

export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const task: Task = req.body;
  try {
    const updateTask = await actualizeTask(id, task);
    HttpResponse.Ok(res, updateTask);
  } catch (err) {
    if (err instanceof ErrorExt) {
      handleError.call(res, err);
    } else {
      HttpResponse.Error(res, err);
    }
  }
};
