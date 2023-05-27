import express from 'express';
import { addTask } from '../controllers/task.js';

const router = express.Router();

//inner routes and matches funcs from controller
router.get('/test', addTask);

export default router;
