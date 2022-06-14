const User = require("../db/schema/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function checkIfUserExists(username, email) {
  try {
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (user !== null) throw new Error("User already exists");
  } catch (error) {
    error.statusCode = 400;
    throw error;
  }
}

async function createUserAndValidate(userDetails) {
  try {
    const user = new User(userDetails);
    await user.validate();
    await user.save();
    return { username: user.username, email: user.email };
  } catch (error) {
    error.statusCode = 400;
    throw error;
  }
}

async function hashPassword(password) {
  try {
    const hash = await bcrypt.hash(password, 3);
    return hash;
  } catch (error) {
    throw new Error(error.message);
  }
}

function createAuthToken(user) {
  const token = jwt.sign(user, process.env.SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION_TIME,
  });
  return token;
}

async function getUser(search) {
  try {
    const user = await User.findOne(search);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function verifyPassword(password, hash) {
  try {
    const match = await bcrypt.compare(password, hash);
    if (!match) {
      throw new Error("wrong password");
    }
  } catch (error) {
    error.statusCode = 401;
    throw error;
  }
}

function verifyToken(token) {
  try {
    var decoded = jwt.verify(token, process.env.SECRET);
    return decoded;
  } catch (error) {
    throw new Error("unauthorized");
  }
}

function validateField(field, value) {
  try {
    switch (field) {
      case "username": {
        if (value.length < 4 || value.length > 20) {
          throw new Error(
            "username length should be between 4 and 20 characters"
          );
        }
        break;
      }
      case "email": {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(value)) throw new Error("invalid email");
        break;
      }
      default:
        break;
    }
  } catch (error) {
    error.statusCode = 400;
    throw error;
  }
}

module.exports = {
  checkIfUserExists,
  hashPassword,
  createUserAndValidate,
  createAuthToken,
  getUser,
  verifyPassword,
  validateField,
  verifyToken,
};
