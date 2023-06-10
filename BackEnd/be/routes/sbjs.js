import express from 'express';
// import { addTask } from '../controllers/task.js';
import { getSbjs, getTeacherSbjs, updateTeacherSubject } from '../controllers/sbj.js';

const router = express.Router();
router.get('/', getSbjs);
router.get('/:id', getTeacherSbjs);
router.put('/:id', updateTeacherSubject);

export default router;
