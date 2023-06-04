import express from 'express';
import { updateUser, checkPassword } from '../controllers/user.js';

const router = express.Router();

router.put('/:id', updateUser);
router.post('/check-password', checkPassword);

export default router;
