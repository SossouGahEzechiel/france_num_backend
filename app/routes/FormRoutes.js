const router = require('express').Router();
const formValidator = require('../validators/FormValidator');

const FormController = require('../controllers/FormController');

router.post('/', formValidator, FormController.store);
router.get('/', FormController.index);
router.get('/news', FormController.news);
router.get('/old', FormController.old);
router.put('/:id', FormController.update);
// router.put('/:id', FormController.updateForm);
// router.delete('/:id', FormController.deleteForm);

module.exports = router;
