import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'

interface AuthUser {
  userId:number,
  role:String
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

const requireAuth = (
  req:Request,
  res:Response,
  next:NextFunction
) =>{
  const authHeader = req.headers.authorization;
  if(!authHeader){
    return res.status(401).json({
      message:"authentication required"
    })
  }

  const [scheme,token] = authHeader.split(" ");
  if(scheme !== "Bearer" || !token){
    return res.status(401).json({
      message:"Invalid authorisation header"
    })
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );
  
    req.user = decoded;
  
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}

export default requireAuth