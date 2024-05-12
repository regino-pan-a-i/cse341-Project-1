const express = require('express');
const router = express.Router();
const contactController = require('../controllers/baseController');

router.get('/', contactController.getContacts);
router.get('/:id', contactController.getById);
router.post('/', contactController.createContact);
router.put('/:contact_id', contactController.updateContact);
router.delete('/:contact_id', contactController.deleteContact);

module.exports = router;


