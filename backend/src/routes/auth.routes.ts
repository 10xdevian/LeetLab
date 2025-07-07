import express from "express";
import { logout, me, signin, signup } from "../controller/auth.controllers";
import { authMiddleware } from "../midlleware/auth.middleware";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/signin", signin);
authRoutes.post("/logout", logout);
authRoutes.get("/me",authMiddleware, me);

export default authRoutes;
