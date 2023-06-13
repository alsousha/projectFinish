import express from 'express';
import { getTasksByTeacher } from '../controllers/task.js';

const router = express.Router();

//inner routes and matches funcs from controller
router.get('/all/:id', getTasksByTeacher);

export default router;
