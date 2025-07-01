const express = require("express");
const router = express.Router();

const formRoutes = require("../routes/FormRoutes");
const contactDataRoutes = require("../routes/ContactDataRoutes");
const sessionRoutes = require("../routes/SessionRoutes");

router.use("/forms", formRoutes);
router.use("/contact-data", contactDataRoutes);
router.use("/auth", sessionRoutes);

module.exports = router;
