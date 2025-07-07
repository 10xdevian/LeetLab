import Express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
import authRoutes from "./routes/auth.routes";

const app = Express();
const PORT = process.env.PORT || 8000;

app.use(Express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Go to the gym");
  
});

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
