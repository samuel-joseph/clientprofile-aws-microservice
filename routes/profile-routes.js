const express = require("express");
const router = express.Router();
const db = require("../models");

// router.get("/:id", (req, res) => {
//   db.ClientProfile.findAll({
//     where: {
//       ClientId: req.params.id,
//     },
//     include: [db.Client],
//   }).then((chosenProfile) => res.send(chosenProfile));
// });

const clientIdSearch = async () => {
  await db.Client.findOne({
    where: { customer_id: req.params.customer_id },
  });
};

router.get("/:customer_id", (req, res) => {
  let clientId = clientIdSearch.dataValues.id;

  db.ClientProfile.findAll({
    where: {
      ClientId: clientId,
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

router.put("/:ClientId", (req, res) => {
  db.ClientProfile.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthdate: req.body.birthdate,
      age: req.body.age,
    },
    { where: { ClientId: req.params.ClientId } }
  ).then((updated) => res.send(updated));
});

module.exports = router;
