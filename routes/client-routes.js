const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/", (req, res) => {
  db.Client.create({
    username: req.body.username,
    password: req.body.password,
  }).then((newClient) => res.send(newClient));
});

router.get("/", (req, res) => {
  db.Client.findAll({
    include: [db.UserProfile, db.PersonalFund],
  }).then((allClient) => res.send(allClient));
});

router.get("/:id", (req, res) => {
  db.Client.findOne({
    where: { id: req.params.id },
    include: [db.UserProfile, db.PersonalFund],
  }).then((allClient) => res.send(allClient));
});

router.delete("/:clientId", (req, res) => {
  db.Client.destroy({
    where: { id: req.params.clientId },
  }).then((allClient) => console.log("REMOVED"));
});

router.put("/:clientId", (req, res) => {
  db.Client.update(
    {
      username: req.body.username,
      password: req.body.password,
    },
    {
      where: { id: req.params.clientId },
    }
  ).then((allClient) =>
    console.log(`Client number ${req.params.clientId} updated!`)
  );
});

module.exports = router;