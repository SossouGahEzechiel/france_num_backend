const router = require('express').Router();

const { loginValidator } = require('../validators/LoginValidator');
const SessionController = require('../controllers/SessionController');

router.post('/login', loginValidator, SessionController.login);
router.post('/logout', SessionController.logout);
router.get('/refresh-data', SessionController.refreshData);

module.exports = router;
