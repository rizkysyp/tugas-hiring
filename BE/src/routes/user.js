const express = require("express");
const router = express.Router();
const { userController } = require("../controller/user");
const { user } = require("../middlewares/auth");
router.post("/register", userController.register);
router.get("/", user, userController.getAllData);
router.post("/login", userController.login);

module.exports = router;
