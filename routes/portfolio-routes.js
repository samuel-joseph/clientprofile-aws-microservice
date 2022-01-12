const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/new", (req, res) => {
  db.PersonalFund.create({
    fundKey: req.body.fundKey,
    ClientId: req.body.ClientId,
  }).then((userPost) => res.send(userPost));
});

router.get("/:id", (req, res) => {
  db.PersonalFund.findAll({
    where: { ClientId: req.params.id },
    include: [db.Client],
  }).then((data) => res.send(data));
});

router.delete("/remove/:clientId/:portfolioId", (req, res) => {
  db.PersonalFund.destroy({
    where: {
      ClientId: req.params.clientId,
      id: req.params.portfolioId,
    },
  }).then((data) =>
    console.log(`Portfolio id num ${req.params.portfolioId} removed!`)
  );
});

module.exports = router;
