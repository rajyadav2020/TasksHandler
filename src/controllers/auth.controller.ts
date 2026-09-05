import { NextFunction, Request,Response } from "express";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

import prisma from '../lib/prisma.js'

const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters"
    });
  }

  const existingemail = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (existingemail) {
    return res.status(409).json({
      message: "Email already registered"
    });
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
    return res.status(400).json({message:"email and password are required"})
  }

  const existinguser = await prisma.user.findUnique({
    where:{
      email:email
    }
  })

  if(!existinguser)
  {
    return res.status(401).json({message:"Invalid email or password"})
  }

  const matched = await bcrypt.compare(password,existinguser.passwordHash)

  if(!matched)
  {
    return res.status(401).json({message:"invalid email or password"})
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

export const getMe = async (req:Request,res:Response) =>{
  const user = await prisma.user.findUnique({
    where:{
      id:req.user!.userId
    }
  })
  return res.status(200).json({
    id: user!.id,
    email: user!.email,
    role: user!.role
  });
}

export {signup,login}