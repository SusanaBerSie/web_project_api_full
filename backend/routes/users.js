const express = require("express");
const { readFile } = require("node:fs/promises");
const path = require("path");
const router = express.Router();
const mongoose = require("mongoose");
const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
} = require("../../backend/controllers/users");
const webToken = require("../middleware/auth");
const {
  validateGetCurrentUser,
  validateUpdateProfile,
  validateUpdateAvatar,
} = require("../middleware/validation");

router.get("/", getUsers);
router.get("/me", webToken, validateGetCurrentUser, getCurrentUser);
router.get("/:userId", webToken, getUserById);
router.patch("/me", webToken, validateUpdateProfile, updateUserProfile);
router.patch("/me/avatar", webToken, validateUpdateAvatar, updateUserAvatar);
module.exports = router;
