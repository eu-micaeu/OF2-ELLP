const express = require('express');
const presenceController = require('../controllers/presence');
const router = express.Router();

router.post('/', presenceController.createPresence);
router.get('/', presenceController.getAllPresences);
router.get('/student/:studentId', presenceController.getStudentPresence);
router.get('/report/:studentId', presenceController.getPresenceReport);
router.put('/:id', presenceController.updatePresence);
router.delete('/:id', presenceController.deletePresence);

module.exports = router;

