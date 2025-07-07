const express = require("express");
const router = express.Router();

const formRoutes = require("../routes/FormRoutes");
const contactDataRoutes = require("../routes/ContactDataRoutes");
const sessionRoutes = require("../routes/SessionRoutes");
const userRoutes = require("../routes/UserRoutes");

const authSessionMiddleware = require("../middlewares/AuthenticatedUserMiddleware");
const dashBoardController = require("./../controllers/DashboardController");

router.use("/forms", formRoutes);
router.use("/contact-data", contactDataRoutes);
router.use("/auth", sessionRoutes);
router.use("/users", authSessionMiddleware, userRoutes);

router.use("/", authSessionMiddleware, dashBoardController.index)

module.exports = router;
