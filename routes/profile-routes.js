const express = require("express");
const router = express.Router();
const db = require("../models");

//Same as client-routes
//Pass on customer_id and not the ID of this MODEL

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

router.post("/:customer_id", (req, res) => {
  const funCall = async () => {
    let clientIdSearch = await db.Client.findOne({
      where: { customer_id: req.params.customer_id },
    });
    let clientId = clientIdSearch.dataValues.id;

    db.ClientProfile.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      birthdate: req.body.birthdate,
      ClientId: clientId, //<====you don't pass this in the body it auto generates ClientId from the function clientIdSearch
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
