const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/:id", (req, res) => {
  db.UserProfile.findAll({
    where: {
      ClientId: req.params.id,
    },
    include: [db.Client],
  }).then((chosenProfile) => res.send(chosenProfile));
});

router.post("/", (req, res) => {
  db.UserProfile.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthdate: req.body.birthdate,
    age: req.body.age,
    ClientId: req.body.ClientId,
  }).then((postProfile) => res.send(postProfile));
});

router.put("/:clientID", (req, res) => {
  db.UserProfile.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthdate: req.body.birthdate,
      age: req.body.age,
    },
    { where: { ClientId: req.params.clientID } }
  ).then((updated) => res.send(updated));
});

module.exports = router;
