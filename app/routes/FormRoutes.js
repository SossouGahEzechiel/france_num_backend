const express = require('express');
const router = express.Router();
const formValidator = require('../validators/FormValidator');
const authSessionMiddleware = require("../middlewares/AuthenticatedUserMiddleware");

const FormController = require('../controllers/FormController');

router.post('/', formValidator, FormController.store);
router.get('/', authSessionMiddleware, FormController.index);
router.get('/news', authSessionMiddleware, FormController.news);
router.get('/old', authSessionMiddleware, FormController.old);
router.put('/:id', authSessionMiddleware, FormController.update);
// router.put('/:id', FormController.updateForm);
// router.delete('/:id', FormController.deleteForm);

module.exports = router;
