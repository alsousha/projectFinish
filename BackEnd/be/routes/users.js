import express from "express";
import { addTask } from "../controllers/task.js";
import {
  deleteUser,
  updateUser,
  /** subjectLevel,*/
  getStudentClasses,
  getTeacherSubjects,
  getTeacherClasses,
  getTeachersStudent,
  getCerfiticationForStud,
  deleteCertification,
  createCategory,
  getCategoriesByTeacher,
  deleteCategory,
  editCategory,
  getUsersInClass,
  addNewClass,
} from "../controllers/user.js";

const router = express.Router();
router.delete("/delete", deleteUser);
router.post("/updateuser", updateUser);
//router.get("/subjectlevel", subjectLevel);
router.get("/studentcsrtif", getCerfiticationForStud);
router.get("/studentclasses", getStudentClasses);
router.get("/teachersubjects", getTeacherSubjects);
router.get("/teacherclasses", getTeacherClasses);
router.get("/teacherstudent", getTeachersStudent);
router.delete("/deletecertif", deleteCertification);
router.post("/createcat", createCategory);
router.get("/getallcat", getCategoriesByTeacher);
router.delete("/deletecat", deleteCategory);
router.post("/editcat", editCategory);
router.get("/userinclass", getUsersInClass);
router.get("/addnewclass", addNewClass);

export default router;
