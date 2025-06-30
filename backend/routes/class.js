const express = require('express');
const classController = require('../controllers/class');
const router = express.Router();

router.post('/', classController.createClass);
router.get('/', classController.getAllClass);
router.put('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);
router.get('/:id', classController.getClassById)
module.exports = router;