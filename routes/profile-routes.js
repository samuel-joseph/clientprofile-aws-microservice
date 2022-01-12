const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/:id", (req, res) => {
  db.profile.findAll({
    where: {
      userId: req.params.id,
    },
    include: [db.user],
  }).then((chosenProfile) => res.send(chosenProfile));
});

router.post("/", (req, res) => {
  db.profile.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthdate: req.body.birthdate,
    age: req.body.age,
    userId: req.body.userId,
  }).then((postProfile) => res.send(postProfile));
});

router.put("/:userId", (req, res) => {
  db.profile.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthdate: req.body.birthdate,
      age: req.body.age,
    },
    { where: { userId: req.params.userId } }
  ).then((updated) => res.send(updated));
});

module.exports = router;
