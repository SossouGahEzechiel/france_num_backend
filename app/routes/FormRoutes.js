const express = require('express');
const router = express.Router();
const formValidator = require('../validators/FormValidator');

const FormController = require('../controllers/FormController');

router.post('/', formValidator, FormController.store);
router.get('/', FormController.index);
router.get('/:id', FormController.show);
// router.put('/:id', FormController.updateForm);
// router.delete('/:id', FormController.deleteForm);

module.exports = router;
