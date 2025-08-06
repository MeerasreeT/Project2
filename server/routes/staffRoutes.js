import express from 'express';
import { staffLogin, getAllStudents, createStudent, updateStudent, deleteStudent } from '../controllers/staffController.js'

const router = express.Router();

router.post('/login', staffLogin)
router.get('/students', getAllStudents)
router.post('/students', createStudent)
router.put('/students/:id', updateStudent)
router.delete('/students/:id', deleteStudent)

export default router;
