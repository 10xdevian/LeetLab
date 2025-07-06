import Express from "express";
import { db } from "./db";

const app = Express();
const PORT = process.env.PORT || 8000;

app.get("/" , (req, res)=> {
    res.send("Go to the gym")
})

app.listen(PORT, () => {
  db;
  console.log(`Server is running on port http://localhost:${PORT}`);
});
