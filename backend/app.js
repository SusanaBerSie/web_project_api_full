const express = require("express");
const path = require("path");
const { PORT = 3001 } = process.env;
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
const cors = require("cors");

mongoose.connect("mongodb://127.0.0.1:27017/aroundb").then(() => {
  console.log("Base de datos conectada");
});

const allowedOrigins = [
  "http://apptravel.chickenkiller.com",
  "https://apptravel.chickenkiller.com",
  "http://api.apptravel.chickenkiller.com",
  "https://api.apptravel.chickenkiller.com",
  "http://www.apptravel.chickenkiller.com",
  "https://www.apptravel.chickenkiller.com",
  "http://www.api.apptravel.chickenkiller.com",
  "https://www.api.apptravel.chickenkiller.com",
];

app.use(express.json());
app.use(requestLogger);
app.use(cors({ origin: allowedOrigins }));

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
