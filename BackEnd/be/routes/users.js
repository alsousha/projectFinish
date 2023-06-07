import express from 'express';
import { updateUser, updateUserPassword, checkPassword } from '../controllers/user.js';

const router = express.Router();

router.put('/:id', updateUser);
router.put('/password/:id', updateUserPassword);

router.post('/check-password', checkPassword);

export default router;
