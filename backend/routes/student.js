const express = require('express');
const studentController = require('../controllers/student');
const router = express.Router();

router.post('/', studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;