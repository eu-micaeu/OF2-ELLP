const express = require('express');
const addressController = require('../controllers/address');
const router = express.Router();

router.post('/', addressController.createAddress);
router.get('/', addressController.getAllAddress);
router.put('/:id', addressController.updateAddress);
router.delete('/:id', addressController.deleteAddress);

module.exports = router;