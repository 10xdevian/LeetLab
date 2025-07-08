import express from "express";

import {
  addContent,
  logout,
  me,
  removeContent,
  signin,
  signup,
} from "../controller";
import { authMiddleware } from "../middleware";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/signin", signin);
authRoutes.post("/logout", authMiddleware, logout);
authRoutes.get("/me", authMiddleware, me);

//  for example
authRoutes.post("/addContent", addContent);
authRoutes.post("/addContent", removeContent);

export default authRoutes;
