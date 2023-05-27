import express from "express";
import { addTask } from "../controllers/task.js";
import {deleteUser} from "../controllers/user.js"

const router = express.Router();
router.delete("/delete", deleteUser);

export default router;
