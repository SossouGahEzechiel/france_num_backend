const express = require('express');
const router = express.Router();
const ContactDataController = require('../controllers/ContactDataController');
const authSessionMiddleware = require('../middlewares/AuthenticatedUserMiddleware');

router.get('/', ContactDataController.index);
router.put('/:id', authSessionMiddleware, ContactDataController.update);

module.exports = router;
