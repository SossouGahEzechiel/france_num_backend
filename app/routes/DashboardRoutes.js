const router = require('express').Router();

const dashboardController = require("../controllers/DashboardController");

router.get("/", dashboardController.index);

module.exports = router;
