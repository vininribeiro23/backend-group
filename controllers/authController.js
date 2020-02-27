const express = require("express");

const User = require("../models/user");

const router = express.Router();

router.get("/usuarios", async (req, res) => {
  const usuarios = await User.find();
  return res.json(usuarios);
});

router.post("/register", async (req, res) => {
  console.log(req.body);

  try {
    const email = req.body.email;

    if (await User.findOne({ email }))
      return res.send(400).send({ error: "User already exists" });

    const user = await User.create(req.body);

    user.password = undefined;

    return res.send({ user });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Registration failed" });
  }
});

router.put("/usuarios/:id", async (req, res) => {
  const { name, email } = req.body;
  const id = req.params.id;
  try {
    let user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ message: "Usuario não encontrado.." });
    } else {
      user.name = name;
      user.email = email;

      const result = await user.save();
      //console.log("salvou: ", result);
      return res.json({ name: `${user.name}`, email: `${user.email}` });
    }
  } catch (erro) {
    //console.log(erro);
    return res.json({ Problem: `${erro}` });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: id });

  user.delete();
  return res.json({ messege: "deletado com sucesso " });
});

module.exports = app => app.use("/auth", router);
