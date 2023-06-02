import express from 'express';
import { addTask } from '../controllers/task.js';
import { login, logout, register, deleteUser } from '../controllers/auth.js';

//This routes for call funcs that will uodate BD
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.delete('/:id', deleteUser);

export default router;
