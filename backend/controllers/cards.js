const Card = require("../models/card");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");
const BadRequestError = require("../errors/BadRequestError");

async function getCards(req, res, next) {
  try {
    const cards = await Card.find({});

    if (!cards || cards.length === 0) {
      throw new NotFoundError("No se encontraron tarjetas");
    }

    res.status(200).json({
      succes: true,
      message: "Tarjetas obtenidas exitosamente",
      data: cards,
    });
  } catch (err) {
    next(err);
  }
}

async function newCard(req, res, next) {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const newCard = await Card.create({ name, link, owner });
    res.status(201).json({
      data: newCard,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteCardById(req, res, next) {
  //REVISAR ERROR
  try {
    const { cardId } = req.params;
    const userId = req.user._id;

    const card = await Card.findById(cardId);

    if (!card) {
      throw new NotFoundError("Tarjeta no encontrada");
    }

    if (card.owner.toString() !== userId.toString()) {
      throw new ForbiddenError("No tienes permiso para eliminar esta tarjeta");
    }

    await Card.findByIdAndDelete(cardId);

    res.json({
      message: "Tarjeta eliminada exitosamente",
      data: card,
    });
  } catch (err) {
    console.error("Error eliminando la tarjeta:", err);
    if (err.name === "CastError") {
      throw new BadRequestError("ID de tarjeta inválido");
    }

    next(err);
  }
}

async function likeCard(req, res, next) {
  try {
    const { _id } = req.user;
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      {
        $addToSet: { likes: _id },
      },
      { new: true }
    ).orFail(new Error("Tarjeta no encontrada"));
    res.json({ message: "liked", card });
  } catch (err) {
    next(err);
  }
}

async function deslikeCard(req, res, next) {
  try {
    const { _id } = req.user;
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      {
        $pull: { likes: _id },
      },
      { new: true }
    ).orFail(new Error("Tarjeta no encontrada"));
    res.json({ message: "desliked", card });
  } catch (err) {
    next(err);
  }
}

module.exports = { getCards, newCard, deleteCardById, likeCard, deslikeCard };
