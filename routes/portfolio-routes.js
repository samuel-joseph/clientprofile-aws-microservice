const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/", (req, res) => {
  db.portfolio.create({
    fundKey: req.body.fundKey,
    userId: req.body.userId,
  }).then((userPost) => res.send(userPost));
});

router.get("/:id", (req, res) => {
  db.portfolio.findAll({
    where: { userId: req.params.id },
    include: [db.user],
  }).then((data) => res.send(data));
});

router.get("/:userId/:id", (req, res) => {
  db.portfolio.findAll({
    where: { 
      userId: req.params.userId,
      id:req.params.id },
  }).then((data) => res.send(data));
});

router.delete("/:userId/:id", (req, res) => {
  db.portfolio.destroy({
    where: {
      userId: req.params.userId,
      id: req.params.id,
    },
  }).then((data) =>
    console.log(`Portfolio id num ${req.params.id} removed!`)
  );
});

module.exports = router;
