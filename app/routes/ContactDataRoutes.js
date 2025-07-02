const express = require('express');
const router = express.Router();
const ContactDataController = require('../controllers/ContactDataController');
const authSessionMiddleware = require('../middlewares/AuthenticatedUserMiddleware');
const contactDataValidator = require('../validators/ContactDataValidator');

router.get('/', ContactDataController.index);
router.put('/:id', contactDataValidator, authSessionMiddleware, ContactDataController.update);

module.exports = router;
