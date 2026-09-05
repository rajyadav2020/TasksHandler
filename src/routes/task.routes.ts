import { Router } from "express";
const router = Router();

import { getTaskById,getAllTasks,updatetask,deleteTask,createtask } from "../controllers/task.controller.js";
import validateTask from "../middleware/validateTask.middleware.js";
import requireAuth from "../middleware/auth.middleware.js";

router.get('/',requireAuth,getAllTasks)
router.get('/:id',requireAuth,getTaskById)
router.post('/',requireAuth,validateTask,createtask)
router.put('/:id',requireAuth,validateTask,updatetask)
router.delete('/:id',requireAuth,deleteTask)


export default router;