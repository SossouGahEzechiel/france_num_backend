const router = require('express').Router();
const ContactDataController = require('../controllers/ContactDataController');
const authSessionMiddleware = require('../middlewares/AuthenticatedUserMiddleware');
const contactDataValidator = require('../validators/ContactDataValidator');

router.get('/', ContactDataController.index);
router.put('/:id', contactDataValidator, ContactDataController.update);

module.exports = router;
