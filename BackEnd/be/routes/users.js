<<<<<<< HEAD
import express from "express";
import { addTask } from "../controllers/task.js";
import { deleteUser, updateUser, subjectLevel } from "../controllers/user.js";

const router = express.Router();
router.delete("/delete", deleteUser);
router.post("/updateuser", updateUser)
router.get("/subjectlevel", subjectLevel);
=======
import express from 'express';
import { updateUser, updateUserPassword, checkPassword } from '../controllers/user.js';

const router = express.Router();

router.put('/:id', updateUser);
router.put('/password/:id', updateUserPassword);

router.post('/check-password', checkPassword);
>>>>>>> 1c8032705df12f9dece4f438861408f0c0a9be28

export default router;
b4ccb9