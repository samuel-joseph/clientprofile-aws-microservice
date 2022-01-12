const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/", (req, res) => {
  db.user.create({
    username: req.body.username,
    password: req.body.password,
  }).then((newClient) => res.send(newClient));
});

router.get("/", (req, res) => {
  db.user.findAll({
    include: [db.profile, db.portfolio],
  }).then((allClient) => res.send(allClient));
});

router.get("/:id", (req, res) => {
  db.user.findOne({
    where: { id: req.params.id },
    include: [db.profile, db.portfolio],
  }).then((allClient) => res.send(allClient));
});

router.delete("/:clientId", (req, res) => {
  db.user.destroy({
    where: { id: req.params.clientId },
  }).then((allClient) => console.log("REMOVED"));
});

router.put("/:clientId", (req, res) => {
  db.user.update(
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