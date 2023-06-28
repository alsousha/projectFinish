import express from "express";
import studentsRoutes from "./routes/students";

const app = express();

app.use(express.json());
app.use("/api", studentsRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
