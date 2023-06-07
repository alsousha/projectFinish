import express from 'express';
import {
  getTeacherClasses,
  updateClass,
  addNewClass,
  deleteClass,
  addNewCategory,
  getCategoriesByTeacher,
} from '../controllers/teacher.js';

const router = express.Router();
router.get('/:id/classes', getTeacherClasses);
router.put('/classes/:id', updateClass);
router.post('/classes/:id', addNewClass);
router.delete('/classes/:id', deleteClass);
router.post('/:id/cats', addNewCategory);
router.get('/:id/cats', getCategoriesByTeacher);
// router.put('/:id', updateTeacherSubject);

export default router;
