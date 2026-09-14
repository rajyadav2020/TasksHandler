import { Router } from "express";
const router = Router();

import { getTaskById,getAllTasks,updatetask,deleteTask,createtask } from "../controllers/task.controller.js";

import requireAuth from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {createTaskSchema, taskIdSchema, paginationSchema,updateTaskSchema} from "../schemas/task.schema.js"

router.get('/',requireAuth,
  validate(paginationSchema , "query"),
  getAllTasks)

router.get('/:id',requireAuth,validate(taskIdSchema , "params"),getTaskById)

router.post('/',requireAuth,validate(createTaskSchema , "body"),createtask)

router.put('/:id',requireAuth,validate(taskIdSchema , "params"),validate(updateTaskSchema , "body"),updatetask)

router.delete('/:id',validate(taskIdSchema, "params"),deleteTask)


export default router;