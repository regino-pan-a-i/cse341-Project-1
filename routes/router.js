const express = require('express');
const router = express.Router();
const contactsRoute = require('./contactRouter');
const baseController = require('../controllers/baseController');



/* ***********************
* Routes
*************************/

router.get('/', baseController.home)
router.get('/self', baseController.self)

router.use('/contacts', contactsRoute)


module.exports = router;