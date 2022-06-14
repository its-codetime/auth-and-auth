const express = require("express");
const { handleRegister, handleLogin } = require("./authHandlers.js");
const router = express.Router();

// auth routes
// register
router.post("/register", handleRegister);
// login
router.post("/login", handleLogin);

module.exports = router;
