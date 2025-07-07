import { Request, Response } from "express";
import { db } from "../lib/db";
import bcrypt from "bcryptjs";
import { UserRole } from "../generated/prisma";
import jwt from "jsonwebtoken";

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

    res.status(201).json({
      msg: "User created",
      newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const signin = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    //  user exists or not
    const existingUser = await db.user.findUnique({
      where: {
        username,
        email,
      },
    });

    if (!existingUser) {
      res.status(400).json({
        error: "username and password is incorrect",
      });
      return;
    }

    //  compare the password is correct or not

    const correctPassword = await bcrypt.compare(
      password,
      existingUser?.password as string
    );

    if (!correctPassword) {
      res.status(400).json({
        error: "Password is incorrect",
      });
      return;
    }

    const token = jwt.sign(
      { id: existingUser.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    //  this is how we store cookies
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.status(200).json({
      success: true,
      msg: "User login Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    res.status(200).json({
      success: true,
      msg: "User logout successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user?.id;

    if (!userId || typeof userId !== "string") {
      res.status(401).json({ error: "Unauthorized - Invalid user ID" });
      return;
    }
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        username: true,
        email: true,
        image: true,
        role: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    // Return user data
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
