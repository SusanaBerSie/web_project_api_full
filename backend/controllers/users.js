require("dotenv").config();
const { JWT_SECRET = "Clave secreta" } = process.env;
const user = require("../models/user");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const UnauthorizedError = require("../errors/UnauthorizedError");

async function getUsers(req, res) {
  try {
    const users = await User.find({});

    if (!users || users.length === 0) {
      throw new NotFoundError("No se encontraron usuarios");
    }

    res.status(200).json({
      data: users,
    });
  } catch (err) {
    console.error("Error leyendo el archivo:", err);
    //next(err);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
}

async function getUserById(req, res) {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).orFail(
      new Error("Usuario no encontrado")
    );
    res.json({ message: "Usuario obtenido exitosamente", user });
  } catch (err) {
    console.error("Error obteniendo usuario:", err);
    next(err);
  }
}

async function createUser(req, res) {
  try {
    const { name, about, avatar, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      data: userResponse,
    });
  } catch (err) {
    console.error("Error creando usuario", err);
    if (err.code === 11000) {
      return res.status(409).json({
        message: "El email ya está registrado",
      });
    }
    if (err.name === "ValidationError") {
      //throw new BadRequestError("Datos ingresados no válidos");
      return res.status(400).json({
        message: "Datos ingresados no válidos",
      });
    }
    //next(err);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
}

async function updateUserProfile(req, res) {
  try {
    const { _id } = req.user;
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      _id,
      { name, about },
      { new: true }
    ).orFail(new Error("Usuario no encontrado"));
    res.json({ message: "Usuario actualizado exitosamente", user });
  } catch (err) {
    console.error("Error obteniendo usuario:", err);
    //next(err);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
}

async function updateUserAvatar(req, res) {
  try {
    const { _id } = req.user;
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      _id,
      { avatar },
      { new: true }
    ).orFail(new Error("Usuario no encontrado"));
    res.json({ message: "Avatar actualizado exitosamente", user });
  } catch (err) {
    console.error("Error obteniendo usuario:", err);
    //next(err);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  user
    .findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Contraseña o email incorrectos"));
      }
      console.log(user);
      const matched = bcrypt.compare(password, user.password);
      if (!matched) {
        return Promise.reject(new Error("Contraseña o email incorrectos"));
      }
      return user;
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      //throw new UnauthorizedError("---")
      //next(err);
      res.status(401).send({ message: err.message });
    });
}

async function getCurrentUser(req, res) {
  try {
    const userId = req.user._id;
    const currentUser = await User.findById(userId).select("-paswword");

    if (!currentUser) {
      throw new NotFoundError("Usuario no encontrado");
    }

    res.status(200).json({
      data: currentUser,
    });
  } catch (err) {
    console.error("Error obteniendo usuario actual:", err);
    //next(err);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
  getCurrentUser,
};
