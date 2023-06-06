import express from 'express';
import { getStudentClassLevel } from '../controllers/student.js';

const router = express.Router();
router.get('/:id/class-level', getStudentClassLevel);
// router.get('/:id', getTeacherSbjs);
// router.put('/:id', updateTeacherSubject);

export default router;
