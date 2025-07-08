const router = require('express').Router();

const UserController = require("../controllers/UserController");
const userValidator = require("../validators/UserValidator")

router.get("/", UserController.index);
router.post("/", userValidator, UserController.store);
router.put("/:id", userValidator, UserController.updateAccess);
router.delete("/:id", userValidator, UserController.delete);

module.exports = router;
