const express = require("express");
const {
  handleRegister,
  handleLogin,
  handleCheckUnique,
  handleAuthorize,
} = require("./authHandlers.js");
const router = express.Router();

// auth routes

// register
router.post("/register", handleRegister);

// login
router.post("/login", handleLogin);

// check unique for username and email
router.post("/check-unique", handleCheckUnique);

// authorization
router.post("/authorize", handleAuthorize);

module.exports = router;
