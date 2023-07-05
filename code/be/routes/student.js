import express from 'express';
import {
  getStudentData,
  getStudentSbjs,
  getTasksFoldersBySubject,
  getTasksByFolder,
  getAllTasks,
  getHWByStudent,
  updatePoints,
} from '../controllers/student.js';

const router = express.Router();
router.get('/:id/data', getStudentData);
router.get('/sbjs/:id', getStudentSbjs);
router.get('/taskfolders/:id', getTasksFoldersBySubject);
router.post('/tasksbyfolder/:id', getTasksByFolder);
router.get('/tasksall', getAllTasks);
router.get('/hwtasks/:id', getHWByStudent);
router.put('/updatepoints/:id', updatePoints);

// router.get('/:id', getTeacherSbjs);
// router.put('/:id', updateTeacherSubject);

// router.post('/:id/taskfolders', getTasksFoldersByTeacher);
// router.put('/tskfolder/:id', updateTskFolder);
// router.delete('/tskfolder/:id', deleteTskFolder);
// router.post('/tskfolder', addNewTskFolder);

export default router;
