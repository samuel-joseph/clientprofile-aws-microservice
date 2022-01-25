const express = require("express");
const { port } = require("pg/lib/defaults");
const router = express.Router();
const db = require("../models");

// router.post("/", (req, res) => {
//   const fundCheck = db.ClientPortfolio.findAll({
//     where: {
//       ClientId: req.body.ClientId,
//     },
//   });

//   db.ClientPortfolio.create({xw
//     fundKey: req.body.fundKey,
//     CustomerId: req.body.CustomerId,
//   }).then((userPost) => res.send(userPost));
// });

router.post("/", (req, res) => {
  // const fundkeyCheck = async () => {
  //   let fundExist = await db.ClientPortfolio.findOne({
  //     where: {
  //       id: req.body.ClientId,
  //       fundKey: req.body.fundKey,
  //     },
  //   });

  const fundkeyCheck = async () => {
    let clientId;
    let clientIdSearch = await db.Client.findOne({
      where: { customer_id: req.body.customer_id },
    }).then((data) => console.log(data));

    clientId = clientIdSearch();

    console.log("This is client id ", clientId);

    let fundExist = await db.ClientPortfolio.findOne({
      where: {
        id: clientId,
        fundKey: req.body.fundKey,
      },
    });

    if (fundExist == null) {
      db.ClientPortfolio.create({
        fundKey: req.body.fundKey,
        ClientId: req.body.ClientId,
        quantity: 1,
      }).then((userPost) => res.send(userPost));
    } else {
      db.ClientPortfolio.update(
        {
          quantity: fundExist.quantity + 1,
        },
        {
          where: {
            ClientId: req.body.ClientId,
            fundKey: req.body.fundKey,
          },
        }
      );
    }
  };

  fundkeyCheck();
});

//check if fund exist
router.get("/fundkey/:CustomerId/:fundKey", (req, res) => {
  db.ClientPortfolio.findAll({
    where: {
      fundKey: req.params.fundKey,
      CustomerId: req.params.CustomerId,
    },
  }).then((portfolio) => {
    res.send(portfolio);
  });
});

router.get("/:id", (req, res) => {
  db.ClientPortfolio.findAll({
    where: { CustomerId: req.params.id },
    include: [db.Client],
  }).then((data) => res.send(data));
});

router.get("/:CustomerId/:id", (req, res) => {
  db.ClientPortfolio.findAll({
    where: {
      CustomerId: req.params.CustomerId,
      id: req.params.id,
    },
  }).then((data) => res.send(data));
});

router.delete("/:CustomerId/:id", (req, res) => {
  db.ClientPortfolio.destroy({
    where: {
      CustomerId: req.params.CustomerId,
      id: req.params.id,
    },
  }).then((data) => console.log(`Portfolio id num ${req.params.id} removed!`));
});

module.exports = router;
