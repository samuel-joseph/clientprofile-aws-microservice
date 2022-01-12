const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/", (req, res) => {
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

router.get("/:clientId/:id", (req, res) => {
  db.PersonalFund.findAll({
    where: { 
      ClientId: req.params.clientId,
      id:req.params.id },
  }).then((data) => res.send(data));
});

router.delete("/:clientId/:id", (req, res) => {
  db.PersonalFund.destroy({
    where: {
      ClientId: req.params.clientId,
      id: req.params.id,
    },
  }).then((data) =>
    console.log(`Portfolio id num ${req.params.id} removed!`)
  );
});

module.exports = router;
