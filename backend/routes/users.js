const express = require("express");
const { readFile } = require("node:fs/promises");
const path = require("path");
const router = express.Router();
const mongoose = require("mongoose");
const {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
  getCurrentUser,
} = require("../../backend/controllers/users");
const webToken = require("../middleware/auth");
const {
  validateUserBody,
  validateSignUp,
  validateSignIn,
  validateGetCurrentUser,
  validateUpdateProfile,
  validateUpdateAvatar,
} = require("../middleware/validation");

router.get("/", getUsers);
router.get("/:userId", webToken, getUserById);
router.get("/me", webToken, validateGetCurrentUser, getCurrentUser);
router.post("/signup", validateUserBody, validateSignUp, createUser);
router.post("/signin", validateSignIn, login);
router.patch("/me", webToken, validateUpdateProfile, updateUserProfile);
router.patch("/me/avatar", webToken, validateUpdateAvatar, updateUserAvatar);
module.exports = router;
