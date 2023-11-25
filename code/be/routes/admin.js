import express from 'express';
import {
  getAllTeachers,
  getTeacherClassCounts,
  getTeacherTasksCounts,
  getAllStudents,
  getStudentAddData,
  editArticle,
  createArticle,
  deleteArticle,
  editCertif,
  createCertif,
  deleteCertif,
} from '../controllers/admin.js';

const router = express.Router();
// router.get('/:id/classes', getTeacherClasses);
router.get('/:id/teachers', getAllTeachers);
router.get('/:id/students', getAllStudents);
router.get('/tasks/count/:id', getTeacherTasksCounts);
router.get('/classes/count/:id', getTeacherClassCounts);
router.get('/studentdata/:id', getStudentAddData);
router.post('/editarticle/:id', editArticle);
router.post('/createarticle', createArticle);
router.delete('/deletearticle/:id', deleteArticle);
router.post('/editcertif/:id', editCertif);
router.post('/createcertif', createCertif);
router.delete('/deletecertif/:id', deleteCertif);

export default router;
