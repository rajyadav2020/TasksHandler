import { Request, Response } from 'express'
import prisma from '../lib/prisma';


//get all tasks

export const getAllTasks =  async (req:Request,res:Response) =>{
  const tasks = await prisma.task.findMany(
    {
      where:{
        userId:req.user!.userId
      }
    }
  );
  res.json(tasks);
}

//create a task
export const createtask = async (req:Request, res:Response)=>{
  const {title,description} = req.body;

  const newtask = await prisma.task.create({
    data: {
      title,
      description,
      userId:req.user!.userId
    }
  });
  res.json(newtask)
}

//get a single task
export const getTaskById  =  async (req:Request,res:Response)=>{
  const taskid = parseInt(req.params.id);
  const onetask = await prisma.task.findFirst(
    {
      where:{
        id:taskid
      }
    }
  );
  res.status(404).json(onetask);
}

//update a task
export const updatetask = async (req:Request,res:Response)=>{
  const taskid = parseInt(req.params.id);
  const updatetask = await prisma.task.updateMany(
    {
      where:{
        id:taskid,
        userId:req.user!.userId
      },
      data:{
        title:req.body.title,
        completed:req.body.completed
      }
    }
  )

  if(updatetask.count === 0)
  {
    return res.status(404).json({message:"task not found"})
  }
  res.json(updatetask)
}

//delete a task
export const deleteTask = async (req:Request,res:Response)=>{
  const taskid = parseInt(req.params.id);
  const deletetask = await prisma.task.deleteMany(
    {
      where:{
        id:taskid,
        userId: req.user!.userId
      }
    }
  )

  if (deletetask.count === 0) {
    return res.status(404).json({
      message: "Task not found"
    });
  }
  
  res.json(deletetask)
}


