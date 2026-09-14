import { Request,Response,NextFunction } from "express";

import {z} from 'zod'

type RequestPart = "body"  | "params" | "query";

const validate = (schema : z.ZodType, part:RequestPart)=>{
  return (req:Request, res:Response , next:NextFunction)=>{
    const result = schema.safeParse(req[part]);

    if(!result.success)
    {
      return res.status(400).json({
        error:"Validation failed",
        details: result.error.flatten()
      });
    }

    next();
  }
}

export default validate;