import express from "express";
import * as dotenv from "dotenv"; //
dotenv.config(); //
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  console.log("get req");
  res.status(200);
  res.json({ message: "operational" });
});


export default app;
