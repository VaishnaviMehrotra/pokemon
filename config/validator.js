const { check } = require("express-validator");

const validateUserRegister = [
  check("email")
    .isEmail()
    .withMessage("The valid email is required")
    .normalizeEmail(),
  check("password")
    .notEmpty()
    .withMessage("The password shouldn't be empty string")
    .isLength({ min: 8 })
    .withMessage("The password should be atleast 8 chars long")
    .custom((val, { req }) => {
      
      if (req.body.repeatPassword !== val) {
        throw new Error("The password doesn't match");
      }
      
      return true;
    }),
];

const validateUserLogin = [
  check("email")
    .notEmpty()
    .withMessage("The email field is required")
    .isEmail()
    .withMessage("The email is not valid"),
  check("password").notEmpty().withMessage("The password field is required"),
];

module.exports = { validateUserRegister, validateUserLogin };