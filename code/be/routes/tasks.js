import express from 'express';
import {
  getTasksByTeacher,
  getTasksByCategory,
  addTaskToFolder,
  deleteTaskFromFolder,
  getFolderStatus,
  publishFolder,
  createTask,
  deleteTask,
  getMoreInfoTask,
  editTask,
  getTaskByUser,
  updateTaskDone,
  getTasksGlobal,
} from '../controllers/task.js';

const router = express.Router();

//inner routes and matches funcs from controller
router.get('/all/:id', getTasksByTeacher);
router.post('/global/all', getTasksGlobal);
router.post('/:id', getTaskByUser);
router.get('/taskscategory/:id', getTasksByCategory);
router.get('/more_info/:id', getMoreInfoTask);
router.post('/tasktofolder/:id', addTaskToFolder);
router.delete('/taskfromfolder/:id', deleteTaskFromFolder);
router.delete('/task/:id', deleteTask);
router.get('/folderstatus/:id', getFolderStatus);
router.post('/publishfolder/:id', publishFolder);
router.post('/createtask/:id', createTask);
router.post('/edittask/:id', editTask);
router.put('/updatetaskdone/:id', updateTaskDone);
export default router;
