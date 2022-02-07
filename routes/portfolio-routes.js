const express = require("express");
const { port } = require("pg/lib/defaults");
const router = express.Router();
const db = require("../models");

const secretCheck = (req, res, next) => {
  req.query.secretKey === "pmY6WrA2oO7Vfdd4zpfz97C9aWMLELqv"
    ? next()
    : res.json({ error: "Access denied to gateway." });
};

router.post("/", secretCheck, (req, res) => {
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
        quantity: req.body.quantity,
      }).then((userPost) => res.send(userPost));
    } else {
      db.ClientPortfolio.update(
        {
          quantity: fundExist.quantity + req.body.quantity,
        },
        {
          where: {
            ClientId: clientId,
            fundKey: req.body.fundKey,
          },
        }
      ).then((data) => {
        res.send(data);
      });
    }
  };

  fundkeyCheck();
});

// selling portfolio according to customer_id
// decrements quantity in the process
// deletes portfolio when quantity is about to turn 0
router.delete(
  "/:customer_id/:fundKey/:quantity_sell",
  secretCheck,
  (req, res) => {
    console.log(`customer_id is ${req.params.customer_id}`);
    const getClientId = async () => {
      const clientIdSearch = await db.Client.findOne({
        where: { customer_id: req.params.customer_id },
      });
      if (!clientIdSearch) {
        return res.send({
          error: `invalid customer_id`,
        });
      }
      let clientId = clientIdSearch.dataValues.id;
      console.log(clientId);
      console.log("client_portfolio next");
      const client_portfolio = await db.ClientPortfolio.findOne({
        where: {
          ClientId: clientId,
          fundKey: req.params.fundKey,
        },
      });
      let client_quantity = client_portfolio.dataValues.quantity;

      if (client_quantity == 1) {
        db.ClientPortfolio.destroy({
          where: { id: client_portfolio.dataValues.id },
        }).then((data) => res.send(data, " REMOVED!"));
      } else {
        db.ClientPortfolio.update(
          {
            quantity: client_quantity - req.params.quantity_sell,
          },
          {
            where: {
              ClientId: clientId,
              fundKey: req.params.fundKey,
            },
          }
        ).then((data) => {
          res.send(data);
        });
      }
    };

    getClientId();
  }
);

//return portfolio according to customer_id
router.get("/:customer_id", secretCheck, (req, res) => {
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

router.get("/:customer_id/fundkey/:fundkeyId", secretCheck, (req, res) => {
  const getClientId = async () => {
    const clientIdSearch = await db.Client.findOne({
      where: { customer_id: req.params.customer_id },
    });
    let clientId = clientIdSearch.dataValues.id;

    db.ClientPortfolio.findAll({
      where: {
        ClientId: clientId,
        fundKey: req.params.fundkeyId,
      },
    }).then((data) => res.send(data));
  };

  getClientId();
});

router.get("/:customer_id/:id", secretCheck, (req, res) => {
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

// router.delete("/:customer_id/:id", (req, res) => {
//   const getClientId = async () => {
//     const clientIdSearch = await db.Client.findOne({
//       where: { customer_id: req.params.customer_id },
//     });
//     let clientId = clientIdSearch.dataValues.id;
//     db.ClientPortfolio.destroy({
//       where: {
//         ClientId: clientId,
//         id: req.params.id,
//       },
//     }).then((data) =>
//       console.log(`Portfolio id num ${req.params.id} removed!`)
//     );
//   };

//   getClientId();
// });

module.exports = router;
