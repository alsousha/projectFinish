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
  getTasksFoldersByIdClass,
  updateTskFolder,
  deleteTskFolder,
  addNewTskFolder,
  getAllTemplates,
  getSubjectsByTeacher,
  getFolderByTeacher,
  getTasksByFolder,
  getCategoriesBySubject,
  isExistsTasksDone,
  getCategoriesBySpecSubject,
  getTasksByStudent,
  getTaskCompletionByClass,
  getTaskdataperstudent,
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
router.post('/catssubject', getCategoriesBySubject);
router.get('/catsbysubject/:id', getCategoriesBySpecSubject);

router.post('/:id/students', getStudentsByTeacher);
router.post('/:id/students_all', getAllStudentsByTeacher);
router.post('/students/:id', addStudentsToClass);
router.delete('/students/:id', deleteStudentFromClass);

router.post('/taskfolders', getTasksFoldersByIdClass);
router.put('/tskfolder/:id', updateTskFolder);
router.delete('/tskfolder/:id', deleteTskFolder);
router.post('/tskfolder', addNewTskFolder);
router.post('/folder', getFolderByTeacher);
router.get('/isexiststasksdone/:id', isExistsTasksDone);
router.post('/tasksbyfolder', getTasksByFolder);
router.post('/tasksbystudent', getTasksByStudent);
router.post('/taskcompletion', getTaskCompletionByClass);
router.post('/taskdataperstudent', getTaskdataperstudent);

// router.get('classes/:id')
// router.put('/:id', updateTeacherSubject);

router.get('/templates', getAllTemplates);
router.get('/sbjs/:id', getSubjectsByTeacher);
// router.get('/statistics/class/:id', getStatisticsByClass);

export default router;
