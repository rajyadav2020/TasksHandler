import { Request, Response, NextFunction } from "express";

const requiredrole = (role:string) =>{
  return (req:Request, res:Response,next:NextFunction)=>{
    if(req.user!.role !== role)
    {
      return res.status(403).json({
        message:"forbidden"
      })
    }
    next()
  }
}
export default requiredrole