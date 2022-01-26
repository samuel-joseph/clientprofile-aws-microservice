const express = require("express");
const { port } = require("pg/lib/defaults");
const router = express.Router();
const db = require("../models");

const getClientId = async (customer_id) => {
  await db.Client.findOne({
    where: { customer_id: customer_id },
  });
};

router.post("/", (req, res) => {
  const fundkeyCheck = async () => {
    let clientId;
    let clientIdSearch = await db.Client.findOne({
      where: { customer_id: req.body.customer_id },
    });
    clientId = clientIdSearch.dataValues.id;

    let fundExist = await db.ClientPortfolio.findOne({
      where: {
        ClientId: clientId,
        fundKey: req.body.fundKey,
      },
    });

    if (fundExist == null) {
      db.ClientPortfolio.create({
        fundKey: req.body.fundKey,
        ClientId: clientId,
        quantity: 1,
      }).then((userPost) => res.send(userPost));
    } else {
      db.ClientPortfolio.update(
        {
          quantity: fundExist.quantity + 1,
        },
        {
          where: {
            ClientId: clientId,
            fundKey: req.body.fundKey,
          },
        }
      );
    }
  };

  fundkeyCheck();
});

//check if fund exist
router.get("/fundkey/:customer_id/:fundKey", (req, res) => {
  let clientId;
  clientId = getClientId(req.params.customer_id).dataValues.id;

  db.ClientPortfolio.findAll({
    where: {
      fundKey: req.params.fundKey,
      ClientId: clientId,
    },
  }).then((portfolio) => {
    res.send(portfolio);
  });
});

router.get("/:customer_id", (req, res) => {
  let clientId;
  clientId = getClientId(req.params.customer_id).dataValues.id;

  db.ClientPortfolio.findAll({
    where: { ClientId: clientId },
    include: [db.Client],
  }).then((data) => res.send(data));
});

router.get("/:customer_id/:id", (req, res) => {
  let clientId;
  clientId = getClientId(req.params.customer_id).dataValues.id;

  db.ClientPortfolio.findAll({
    where: {
      ClientId: clientId,
      id: req.params.id,
    },
  }).then((data) => res.send(data));
});

router.delete("/:customer_id/:id", (req, res) => {
  let clientId;
  clientId = getClientId(req.params.customer_id).dataValues.id;
  db.ClientPortfolio.destroy({
    where: {
      ClientId: clientId,
      id: req.params.id,
    },
  }).then((data) => console.log(`Portfolio id num ${req.params.id} removed!`));
});

module.exports = router;
