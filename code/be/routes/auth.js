import express from 'express';
import { addTask } from '../controllers/task.js';
import { login, logout, register, deleteUser } from '../controllers/auth.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/delete', deleteUser);

export default router;
