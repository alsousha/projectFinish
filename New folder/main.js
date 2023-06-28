import express from "express";
import cors from "cors";
import path from "path";
import { addStudentsToClass } from "./addstud";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/students", addStudentsToClass);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
