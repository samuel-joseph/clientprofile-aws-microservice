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

// const funCall = async () => {
//   await db.Client.findOne({
//     where: { customer_id: req.params.customer_id },
//   });
// };

router.get("/:customer_id", (req, res) => {
  const funCall = async () => {
    let clientIdSearch = await db.Client.findOne({
      where: { customer_id: req.params.customer_id },
    });
    let clientId = clientIdSearch.dataValues.id;

    db.ClientProfile.findAll({
      where: {
        ClientId: clientId,
      },
      include: [db.Client],
    }).then((chosenProfile) => res.send(chosenProfile));
  };

  funCall();
});

router.post("/", (req, res) => {
  const funCall = async () => {
    let clientIdSearch = await db.Client.findOne({
      where: { customer_id: req.body.customer_id },
    });
    let clientId = clientIdSearch.dataValues.id;

    db.ClientProfile.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthdate: req.body.birthdate,
      age: req.body.age,
      ClientId: clientId,
    }).then((postProfile) => res.send(postProfile));
  };

  funCall();
});

router.put("/:customer_id", (req, res) => {
  const funCall = async () => {
    let clientIdSearch = await db.Client.findOne({
      where: { customer_id: req.params.customer_id },
    });
    let clientId = clientIdSearch.dataValues.id;
    db.ClientProfile.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthdate: req.body.birthdate,
        age: req.body.age,
      },
      { where: { ClientId: clientId } }
    ).then((updated) => res.send(updated));
  };
  funCall();
});

module.exports = router;
