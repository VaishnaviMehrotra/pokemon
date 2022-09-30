const express = require("express");
const router = express.Router();
const UserController = require("../controller/user");

const {
  validateUserRegister,
  validateUserLogin,
} = require("../config/validator");
const authMiddleware = require("../config/auth");

router.post("/register", validateUserRegister, UserController.registerUser);


router.post("/login", validateUserLogin, UserController.loginUser);







module.exports = router;