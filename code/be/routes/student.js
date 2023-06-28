import express from 'express';
import {
  getStudentClassLevel,
  getStudentSbjs,
  getTasksFoldersBySubject,
  getTasksByFolder,
  getAllTasks,
  getHWByStudent,
} from '../controllers/student.js';

const router = express.Router();
router.get('/:id/class-level', getStudentClassLevel);
router.get('/sbjs/:id', getStudentSbjs);
router.get('/taskfolders/:id', getTasksFoldersBySubject);
router.get('/tasksbyfolder/:id', getTasksByFolder);
router.get('/tasksall', getAllTasks);
router.get('/hwtasks/:id', getHWByStudent);

// router.get('/:id', getTeacherSbjs);
// router.put('/:id', updateTeacherSubject);

// router.post('/:id/taskfolders', getTasksFoldersByTeacher);
// router.put('/tskfolder/:id', updateTskFolder);
// router.delete('/tskfolder/:id', deleteTskFolder);
// router.post('/tskfolder', addNewTskFolder);

export default router;
