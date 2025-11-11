const express = require("express");
const { readFile } = require("node:fs/promises");
const path = require("path");
const router = express.Router();
const mongoose = require("mongoose");
const { ref } = require("node:process");
const webToken = require("../middleware/auth");
const {
  getCards,
  newCard,
  deleteCardById,
  likeCard,
  deslikeCard,
} = require("../controllers/cards");
const {
  validateNewCard,
  validateCardId,
  validateDeleteCard,
  validateCardLike,
  validateCardDislike,
} = require("../middleware/validation");

router.get("/", getCards);
router.post("/", webToken, validateNewCard, newCard);
router.delete(
  "/:cardId",
  webToken,
  validateCardId,
  validateDeleteCard,
  deleteCardById
);
router.put(
  "/:cardId/likes",
  webToken,
  validateCardId,
  validateCardLike,
  likeCard
);
router.delete(
  "/:cardId/likes",
  webToken,
  validateCardId,
  validateCardDislike,
  deslikeCard
);

module.exports = router;
