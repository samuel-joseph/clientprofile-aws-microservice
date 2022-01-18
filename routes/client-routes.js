const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/", (req, res) => {
  db.Customer.create({
    customer_id: req.body.customer_id,
  }).then((newClient) => res.send(newClient));
});

router.get("/", (req, res) => {
  db.Customer.findAll({
    include: [db.CustomerProfile, db.CustomerPortfolio],
  }).then((allClient) => res.send(allClient));
});

router.get("/:id", (req, res) => {
  db.Customer.findOne({
    where: { id: req.params.id },
    include: [db.profile, db.portfolio],
  }).then((allClient) => res.send(allClient));
});

router.delete("/:id", (req, res) => {
  db.Customer.destroy({
    where: { id: req.params.id },
  }).then((allClient) => console.log("REMOVED"));
});

router.put("/:id", (req, res) => {
  db.Customer.update(
    {
      username: req.body.username,
      password: req.body.password,
    },
    {
      where: { id: req.params.id },
    }
  ).then((allClient) =>
    console.log(`Client number ${req.params.clientId} updated!`)
  );
});

module.exports = router;
