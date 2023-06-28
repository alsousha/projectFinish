import express from "express";
import { addStudentsToClass } from "../controllers/students";

const router = express.Router();
router.post("/students", addStudentsToClass);

export default router;
