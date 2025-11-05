const express = require("express");
const path = require("path");
const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const mongoose = require("mongoose");
const { login, createUser } = require("./controllers/users");
const {
  validateSignIn,
  validateUserBody,
  validateSignUp,
} = require("./middleware/validation");
const { requestLogger, errorLogger } = require("./middleware/logger");

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(express.json());
app.use(requestLogger);

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);
app.post("/signin", validateSignIn, login);
app.post("/signup", validateUserBody, validateSignUp, createUser);

app.use(errorLogger);

app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .send({ message: err.message, name: err.name });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
