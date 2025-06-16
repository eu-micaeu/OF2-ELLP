const express = require('express');
const tutorController = require('../controllers/tutor');
const router = express.Router();

router.post('/', tutorController.createTutor);
router.get('/', tutorController.getAllTutors);
router.put('/:id', tutorController.updateTutor);
router.delete('/:id', tutorController.deleteTutor);

module.exports = router;