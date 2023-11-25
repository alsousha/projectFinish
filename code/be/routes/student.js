import express from 'express';
import {
  getStudentData,
  getStudentSbjs,
  getTasksFoldersBySubject,
  getTasksFoldersBySbjAndClass,
  getTasksByFolder,
  getAllTasks,
  getHWByStudent,
  updatePoints,
  getStudentClassBySbj,
  getStatisticData,
  getStudentCertif,
  incpoints,
  putcertifcard,
} from '../controllers/student.js';

const router = express.Router();
router.get('/:id/data', getStudentData);
router.get('/sbjs/:id', getStudentSbjs);
router.post('/classbysbj/:id', getStudentClassBySbj);
router.get('/taskfolders/:id', getTasksFoldersBySubject);
router.post('/tasksbyfolder/:id', getTasksByFolder);
router.post('/tasksfolderbysbjandclass/:id', getTasksFoldersBySbjAndClass);
router.get('/tasksall', getAllTasks);
router.get('/hwtasks/:id', getHWByStudent);
router.put('/updatepoints/:id', updatePoints);
router.put('/incpoints/:id', incpoints);
router.post('/statisticdata', getStatisticData);
router.get('/certificates/:id', getStudentCertif);
router.put('/putcertifcard/:id', putcertifcard);

// router.get('/:id', getTeacherSbjs);
// router.put('/:id', updateTeacherSubject);

// router.post('/:id/taskfolders', getTasksFoldersByTeacher);
// router.put('/tskfolder/:id', updateTskFolder);
// router.delete('/tskfolder/:id', deleteTskFolder);
// router.post('/tskfolder', addNewTskFolder);

export default router;
