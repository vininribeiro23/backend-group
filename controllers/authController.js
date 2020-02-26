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

router.put("/usuarios/:id", (req, res) => {
  console.log("teste");
  return res.json(req.body);
});

router.delete("/delete/:id", (req, res) => {
  console.log("deletando");
  return res.json(req.body);
});

module.exports = app => app.use("/auth", router);
