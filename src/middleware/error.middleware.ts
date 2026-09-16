import { Request,Response,NextFunction } from "express";

import ApiError from "../utils/ApiError";

const errorHandler = (
  err:unknown,
  req:Request,
  res:Response,
  next:NextFunction
) =>{
  if( err instanceof ApiError)
  {
    return res.status(err.statusCode).json({
      error : err.message
    })
  }

  console.log(err);

  return res.status(500).json({
    error:"internal server error"
  })
}

export default errorHandler;