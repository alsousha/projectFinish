import express from "express";
import { addTask } from "../controllers/task.js";
import { deleteUser, updateUser, subjectLevel } from "../controllers/user.js";

const router = express.Router();
router.delete("/delete", deleteUser);
router.post("/updateuser", updateUser)
router.get("/subjectlevel", subjectLevel);

export default router;
b4ccb9