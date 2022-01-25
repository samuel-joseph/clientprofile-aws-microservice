const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/:id", (req, res) => {
  db.ClientProfile.findAll({
    where: {
      CustomerId: req.params.id,
    },
    include: [db.Client],
  }).then((chosenProfile) => res.send(chosenProfile));
});

router.post("/", (req, res) => {
  db.ClientProfile.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthdate: req.body.birthdate,
    age: req.body.age,
    ClientId: req.body.ClientId,
  }).then((postProfile) => res.send(postProfile));
});

router.put("/:CustomerId", (req, res) => {
  db.ClientProfile.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthdate: req.body.birthdate,
      age: req.body.age,
    },
    { where: { CustomerId: req.params.CustomerId } }
  ).then((updated) => res.send(updated));
});

module.exports = router;
