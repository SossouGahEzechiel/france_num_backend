const router = require('express').Router();

const formRoutes = require("../routes/FormRoutes");
const contactDataRoutes = require("../routes/ContactDataRoutes");
const sessionRoutes = require("../routes/SessionRoutes");
const userRoutes = require("../routes/UserRoutes");
const dashBoardRoutes = require("../routes/DashBoardRoutes");

router.use("/forms", formRoutes);
router.use("/contact-data", contactDataRoutes);
router.use("/auth", sessionRoutes);
router.use("/users", userRoutes);
router.use("/dashboard", dashBoardRoutes);

module.exports = router;
