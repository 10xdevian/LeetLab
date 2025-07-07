import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.cookies.jwt;

    if (!header) {
      res.status(400).json({
        error: "token not exists",
      });
      return;
    }

    const decode = jwt.verify(header, process.env.JWT_SECRET as string) as {
      id: string;
    };

    // @ts-ignore
    req.user = {
      id: decode.id,
    };
    next();
  } catch (error) {
    console.log(error);
  }
};
