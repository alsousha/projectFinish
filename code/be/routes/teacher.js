import express from 'express';
import {
  getTeacherClasses,
  updateClass,
  addNewClass,
  deleteClass,
  addNewCategory,
  getCategoriesByTeacher,
  updateCategory,
  deleteCategory,
  getStudentsByTeacher,
  deleteStudentFromClass,
  addStudentsToClass,
  getAllStudentsByTeacher,
  getTasksFoldersByTeacher,
  updateTskFolder,
  deleteTskFolder,
  addNewTskFolder,
} from '../controllers/teacher.js';

const router = express.Router();
router.get('/:id/classes', getTeacherClasses);
router.put('/classes/:id', updateClass);
router.post('/classes/:id', addNewClass);
router.delete('/classes/:id', deleteClass);

router.delete('/cats/:id', deleteCategory);
router.post('/cats/:id/', addNewCategory);
router.put('/cat/:id', updateCategory);
router.get('/:id/cats', getCategoriesByTeacher);

router.post('/:id/students', getStudentsByTeacher);
router.post('/:id/students_all', getAllStudentsByTeacher);
router.post('/students/:id', addStudentsToClass);
router.delete('/students/:id', deleteStudentFromClass);

router.post('/:id/taskfolders', getTasksFoldersByTeacher);
router.put('/tskfolder/:id', updateTskFolder);
router.delete('/tskfolder/:id', deleteTskFolder);
router.post('/tskfolder', addNewTskFolder);
// router.get('classes/:id')
// router.put('/:id', updateTeacherSubject);

export default router;
