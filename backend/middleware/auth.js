require("dotenv").config();
const { JWT_SECRET = "Clave secreta" } = process.env;
const jwt = require("jsonwebtoken");

const webToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Requiere autor" });
  }
  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(403).send({ message: "Requiere autorización" });
  }
  req.user = payload;
  next();
};

module.exports = webToken;
