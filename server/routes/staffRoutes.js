import express from 'express';
import { staffLogin, getAllStudents, createStudent, updateStudent, deleteStudent } from '../controllers/staffController.js'

const router = express.Router();

router.post('/login', staffLogin)
router.post('/students', getAllStudents)
router.post('/students', createStudent)
router.post('/students/:id', updateStudent)
router.post('/students/:id', deleteStudent)

export default router;
