const express = require('express');
const router = express.Router();
const contactController = require('../controllers/baseController');

router.get('/', contactController.getContacts);
router.get('/:id', contactController.getById);

module.exports = router;


