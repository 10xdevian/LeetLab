import { Request, Response } from "express";
import { db } from "../lib/db";
import bcrypt from "bcryptjs";
import { UserRole } from "../generated/prisma";

export const signup = async (req: Request, res: Response) => {
  const { name, username, email, password } = req.body;

  //  check existing user
  try {
    const existingUser = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUser) {
      res.status(400).json({
        error: "User already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        role: UserRole.USER,
      },
    });

    res.status(200).json({
      msg: "User created",
      newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const signin = async (req: Request, res: Response) => {
    const {username , email , password} = req.body;

    
};

export const logout = async (req: Request, res: Response) => {};

export const me = async (req: Request, res: Response) => {};
