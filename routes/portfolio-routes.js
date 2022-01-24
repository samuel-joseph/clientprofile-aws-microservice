const express = require("express");
const { port } = require("pg/lib/defaults");
const router = express.Router();
const db = require("../models");

router.post("/", (req, res) => {
  db.CustomerPortfolio.create({
    fundKey: req.body.fundKey,
    CustomerId: req.body.CustomerId,
  }).then((userPost) => res.send(userPost));
});

//check if fund exist
router.get("/fundkey/:CustomerId/:fundKey", (req, res) => {
  db.CustomerPortfolio.findAll({
    where: {
      fundKey: req.params.fundKey,
      CustomerId: req.params.CustomerId,
    },
  }).then((portfolio) => {
    console.log("The response ", portfolio);
    console.log("The length ", portfolio.length);
    res.send(portfolio);
  });
});

router.get("/:id", (req, res) => {
  db.CustomerPortfolio.findAll({
    where: { CustomerId: req.params.id },
    include: [db.Customer],
  }).then((data) => res.send(data));
});

router.get("/:CustomerId/:id", (req, res) => {
  db.CustomerPortfolio.findAll({
    where: {
      CustomerId: req.params.CustomerId,
      id: req.params.id,
    },
  }).then((data) => res.send(data));
});

router.delete("/:CustomerId/:id", (req, res) => {
  db.CustomerPortfolio.destroy({
    where: {
      CustomerId: req.params.CustomerId,
      id: req.params.id,
    },
  }).then((data) => console.log(`Portfolio id num ${req.params.id} removed!`));
});

module.exports = router;
