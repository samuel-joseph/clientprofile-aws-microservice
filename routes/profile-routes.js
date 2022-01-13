const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/:id", (req, res) => {
  db.CustomerProfile.findAll({
    where: {
      CustomerId: req.params.id,
    },
    include: [db.Customer],
  }).then((chosenProfile) => res.send(chosenProfile));
});

router.post("/", (req, res) => {
  db.CustomerProfile.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthdate: req.body.birthdate,
    age: req.body.age,
    CustomerId: req.body.CustomerId,
  }).then((postProfile) => res.send(postProfile));
});

router.put("/:CustomerId", (req, res) => {
  db.CustomerProfile.update(
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
