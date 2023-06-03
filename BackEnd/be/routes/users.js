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
} from "../controllers/user.js";

const router = express.Router();
router.delete("/delete", deleteUser);
router.post("/updateuser", updateUser)
//router.get("/subjectlevel", subjectLevel);
router.get("/studentcsrtif", getCerfiticationForStud);
router.get("/studentclasses", getStudentClasses);
router.get("/teachersubjects", getTeacherSubjects);
router.get("/teacherclasses", getTeacherClasses);
router.get("/teacherstudent", getTeachersStudent);

export default router;
