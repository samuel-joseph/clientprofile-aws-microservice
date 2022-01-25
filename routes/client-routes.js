const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/", (req, res) => {
  const clientCheck = async () => {
    let customerId = await db.Client.findOne({
      where: { customer_id: req.body.customer_id },
    });

    console.log("This is customerId ", customerId);

    if (customerId == null) {
      db.Client.create({
        customer_id: req.body.customer_id,
      }).then((newClient) => res.send(newClient));
    } else {
      res.send("Customer id already exist!");
    }
  };

  clientCheck();
});

router.get("/", (req, res) => {
  db.Client.findAll({
    include: [db.ClientProfile, db.ClientPortfolio],
  }).then((allClient) => res.send(allClient));
});

router.get("/:id", (req, res) => {
  db.Client.findOne({
    where: { customer_id: req.params.id },
    include: [db.ClientProfile, db.ClientPortfolio],
  }).then((allClient) => res.send(allClient));
});

router.delete("/:id", (req, res) => {
  db.Client.destroy({
    where: { id: req.params.id },
  }).then((allClient) => console.log("REMOVED"));
});

module.exports = router;
