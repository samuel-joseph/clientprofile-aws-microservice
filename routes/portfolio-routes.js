const express = require("express");
const { port } = require("pg/lib/defaults");
const router = express.Router();
const db = require("../models");

router.post("/", (req, res) => {
  db.ClientPortfolio.create({
    fundKey: req.body.fundKey,
    CustomerId: req.body.CustomerId,
  }).then((userPost) => res.send(userPost));
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
