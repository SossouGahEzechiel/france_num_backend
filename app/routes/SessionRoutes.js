const express = require('express');
const router = express.Router();
const SessionController = require('../controllers/SessionController');
const authMiddleware = require('../middlewares/AuthenticatedUserMiddleware');

router.post('/login', SessionController.login);
router.post('/logout', authMiddleware, SessionController.logout);

module.exports = router;
