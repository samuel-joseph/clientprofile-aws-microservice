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

// selling
router.put("/:customer_id/:fundKey", (req, res) => {
  console.log("AM I CALLED INSIDE PUT?");
  const getClientId = async () => {
    console.log("AM I CALLED INSIDE ASYNC?");
    const clientIdSearch = await db.Client.findOne({
      where: { customer_id: req.params.customer_id },
    });
    let clientId = clientIdSearch.dataValues.id;
    const client_portfolio = db.ClientPortfolio.findAll({
      where: {
        ClientId: clientId,
        id: req.params.id,
      },
    });
    let client_quantity = client_portfolio.dataValues.quantity;
    console.log(client_portfolio.dataValues);
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
