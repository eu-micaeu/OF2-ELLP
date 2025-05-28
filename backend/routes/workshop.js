const express = require('express');
const workshopController = require('../controllers/workshop');
const router = express.Router();

router.post('/', workshopController.createWorkshop);
router.get('/', workshopController.getAllWorkshops);
router.put('/:id', workshopController.updateWorkshop);
router.delete('/:id', workshopController.deleteWorkshop);

module.exports = router;