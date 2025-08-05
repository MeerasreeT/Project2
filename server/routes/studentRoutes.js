import express from 'express';

import { studentLogin } from '../controllers/studentController.js'
import { getAllStudents } from '../controllers/staffController.js';
import { createStudent } from '../controllers/staffController.js';
import { updateStudent } from '../controllers/staffController.js';
import { deleteStudent } from '../controllers/staffController.js';

const router = express.Router();

router.post('/login', studentLogin);
router.get('/',getAllStudents);
router.post('/',createStudent);
router.put('/:id', updateStudent);
router.delete('/:id',deleteStudent);

export default router;