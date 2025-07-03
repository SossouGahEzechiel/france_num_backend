const express = require('express');
const router = express.Router();
const { loginValidator } = require('../validators/LoginValidator');
const SessionController = require('../controllers/SessionController');
const authMiddleware = require('../middlewares/AuthenticatedUserMiddleware');

router.post('/login', loginValidator, SessionController.login);
router.post('/logout', authMiddleware, SessionController.logout);
router.get('/refresh-data', authMiddleware, SessionController.refreshData);

module.exports = router;
