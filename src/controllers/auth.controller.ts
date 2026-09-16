import { NextFunction, Request ,Response } from "express";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import ApiError from "../utils/ApiError.js";

import prisma from '../lib/prisma.js'

const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400 , "Email and password are required")
  }

  if (password.length < 8) {
    throw new ApiError(400 , "Password must be at least 8 characters")
  }

  const existingemail = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (existingemail) {
    throw new ApiError(409 , "Email already registered")
  }

  const passwordHash = await bcrypt.hash(password,12);
  

  //now create the new user
  const user = await prisma.user.create({
    data:{
      email:email,
      passwordHash:passwordHash
    }
  })

  return res.status(201).json({
    id:user.id,
    email:user.email,
    role:user.role
  });

};

const login = async (req:Request , res:Response) =>{
  const {email,password} =req.body;
  if(!email || !password)
  {
   throw new ApiError(400 , "email and password are required")
  }

  const existinguser = await prisma.user.findUnique({
    where:{
      email:email
    }
  })

  if(!existinguser)
  {
    throw  new ApiError (401 , "Invalid email or password")
  }

  const matched = await bcrypt.compare(password,existinguser.passwordHash)

  if(!matched)
  {
    throw new ApiError (401 , "invalid email or password")
  }

  const token = jwt.sign(
    {
      userId:existinguser.id,
      role:existinguser.role
    },
    process.env.JWT_SECRET!,
    {
      expiresIn:"15m"
    }
  )

  return res.status(200).json({
    message:"login successful",
    token
  })

}

export const getMe = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user!.userId
    }
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json({
    id: user.id,
    email: user.email,
    role: user.role
  });
};

export {signup,login}