const express = require("express");
const { port } = require("pg/lib/defaults");
const router = express.Router();
const db = require("../models");

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

// selling portfolio according to customer_id
// decrements quantity in the process
// deletes portfolio when quantity is about to turn 0
router.put("/:customer_id/:fundKey", (req, res) => {
  const getClientId = async () => {
    const clientIdSearch = await db.Client.findOne({
      where: { customer_id: req.params.customer_id },
    });
    let clientId = clientIdSearch.dataValues.id;
    console.log(clientId);
    console.log("client_portfolio next");
    const client_portfolio = await db.ClientPortfolio.findOne({
      where: {
        ClientId: clientId,
        id: req.params.fundKey,
      },
    });
    let client_quantity = client_portfolio.dataValues.quantity;

    if (client_quantity == 1) {
      db.ClientPortfolio.destroy({
        where: { id: client_portfolio.dataValues.id },
      }).then((data) => console.log(data, " REMOVED!"));
    } else {
      db.ClientPortfolio.update(
        {
          quantity: client_quantity - 1,
        },
        {
          where: {
            ClientId: clientId,
            fundKey: req.params.fundKey,
          },
        }
      );
    }
  };

  getClientId();
});

//return portfolio according to customer_id
router.get("/:customer_id", (req, res) => {
  const getClientId = async () => {
    const clientIdSearch = await db.Client.findOne({
      where: { customer_id: req.params.customer_id },
    });

    let clientId = clientIdSearch.dataValues.id;
    db.ClientPortfolio.findAll({
      where: { ClientId: clientId },
      include: [db.Client],
    }).then((data) => res.send(data));
  };

  getClientId();
});

router.get("/:customer_id/:id", (req, res) => {
  const getClientId = async () => {
    const clientIdSearch = await db.Client.findOne({
      where: { customer_id: req.params.customer_id },
    });
    let clientId = clientIdSearch.dataValues.id;

    db.ClientPortfolio.findAll({
      where: {
        ClientId: clientId,
        id: req.params.id,
      },
    }).then((data) => res.send(data));
  };

  getClientId();
});

router.delete("/:customer_id/:id", (req, res) => {
  const getClientId = async () => {
    const clientIdSearch = await db.Client.findOne({
      where: { customer_id: req.params.customer_id },
    });
    let clientId = clientIdSearch.dataValues.id;
    db.ClientPortfolio.destroy({
      where: {
        ClientId: clientId,
        id: req.params.id,
      },
    }).then((data) =>
      console.log(`Portfolio id num ${req.params.id} removed!`)
    );
  };

  getClientId();
});

module.exports = router;
