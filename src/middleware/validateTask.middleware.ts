import { Request,Response,NextFunction } from "express";

const validateTask = (
  req:Request,
  res:Response,
  next:NextFunction
) =>{
  const {title,description} = req.body;

  if(!title || typeof title !=="string")
  {
    return res.status(400).json({
      message:"Title must be non empty and must be string"
    });
  }

  if(!description || typeof description !== "string"){
    return res.status(400).json({
      message:"description is required and must be string"
    })
  }

  next();
};

export default validateTask;