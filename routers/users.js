const dotenv = require('dotenv').config();
const express = require("express");
const user = require("../models/user");
const router = express.Router();
const User = require("../models/user");
const md5 = require("blueimp-md5");

function verificarToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.CLAVE_SECRETA, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    }
    req.usuario = decoded;
    next();
  });
}

// Get all
router.get("/users",verificarToken, async (req, res) => {
  try {
    const users = await user.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get by user
router.get('/users/:user',verificarToken, getUser, (req, res) => {
  res.json(res.user)
})


//Post
router.post("/users/add",verificarToken, async (req, res) => {
  const user = new User({
    user: md5(req.body.user),
    mail: md5(req.body.mail),
    password: md5(req.body.password),
    dni: md5(req.body.dni),
    type: md5(req.body.type)
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Put
router.put('/update/:user',verificarToken, getUser, async (req, res) => {
  if (req.body.user != null) {
    res.user.user = req.body.user
  }
  if (req.body.mail != null) {
    res.user.mail = req.body.mail
  }
  if (req.body.password != null) {
    res.user.password = req.body.password
  }
  if (req.body.dni != null) {
    res.user.dni = req.body.dni
  }
  if (req.body.type != null) {
    res.user.type = req.body.type
  }
  if (req.body.active != null) {
    res.user.active = req.body.active
  }

  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete User
router.delete('/delete/:user',verificarToken, getUser, async (req, res) => {
  try {
    await res.user.remove()
    res.json({ message: 'Deleted User' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getUser(req, res, next) {
  let user
  try {
    user = await User.findOne({user: req.params.user})
    if (user == null) {
      return res.status(404).json({ message: 'Error! Cannot find User' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.user = user
  next()
}

module.exports = router;
