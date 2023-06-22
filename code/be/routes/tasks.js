import express from 'express';
import {
  getTasksByTeacher,
  getTasksByCategory,
  addTaskToFolder,
  deleteTaskFromFolder,
  getFolderStatus,
  publishFolder,
  createTask,
} from '../controllers/task.js';

const router = express.Router();

//inner routes and matches funcs from controller
router.get('/all/:id', getTasksByTeacher);
router.get('/taskscategory/:id', getTasksByCategory);
router.post('/tasktofolder/:id', addTaskToFolder);
router.delete('/taskfromfolder/:id', deleteTaskFromFolder);
router.get('/folderstatus/:id', getFolderStatus);
router.post('/publishfolder/', publishFolder);
router.post('/createtask/', createTask);
export default router;
