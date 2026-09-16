import { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import ApiError from "../utils/ApiError.js";

// Get all tasks
export const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany({
    where: {
      userId: req.user!.userId
    }
  });

  return res.json(tasks);
};

// Create a task
export const createtask = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  const newtask = await prisma.task.create({
    data: {
      title,
      description,
      userId: req.user!.userId
    }
  });

  return res.status(201).json(newtask);
};

// Get a single task
export const getTaskById = async (req: Request, res: Response) => {
  const taskid = parseInt(req.params.id);

  const onetask = await prisma.task.findFirst({
    where: {
      id: taskid,
      userId: req.user!.userId
    }
  });

  if (!onetask) {
    throw new ApiError(404, "Task not found");
  }

  return res.json(onetask);
};

// Update a task
export const updatetask = async (req: Request, res: Response) => {
  const taskid = parseInt(req.params.id);

  const updatedtask = await prisma.task.updateMany({
    where: {
      id: taskid,
      userId: req.user!.userId
    },
    data: {
      title: req.body.title,
      completed: req.body.completed
    }
  });

  if (updatedtask.count === 0) {
    throw new ApiError(404, "Task not found");
  }

  return res.json(updatedtask);
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  const taskid = parseInt(req.params.id);

  const deletedtask = await prisma.task.deleteMany({
    where: {
      id: taskid,
      userId: req.user!.userId
    }
  });

  if (deletedtask.count === 0) {
    throw new ApiError(404, "Task not found");
  }

  return res.json(deletedtask);
};