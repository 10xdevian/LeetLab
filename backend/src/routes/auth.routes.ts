import express from "express";

import { authMiddleware } from "../midlleware/auth.middleware";
import { addContent, logout, me, removeContent, signin, signup } from "../controller";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/signin", signin);
authRoutes.post("/logout", logout);
authRoutes.get("/me",authMiddleware, me);

//  for example
authRoutes.post("/addContent", addContent);
authRoutes.post("/addContent", removeContent);

export default authRoutes;
