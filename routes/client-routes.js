const express = require("express");
const router = express.Router();
const db = require("../models");

const secretCheck = (req, res, next) => {
  req.query.secretKey === "pmY6WrA2oO7Vfdd4zpfz97C9aWMLELqv"
    ? next()
    : res.json({ error: "Access denied to gateway." });
};

//in POST/Create customer profile you need to pass:
//         {
//            "customer_id": n
//         }
//
//  *notes has to be unique or will throw an error  message

router.post("/", secretCheck, (req, res) => {
  const clientCheck = async () => {
    let customerId = await db.Client.findOne({
      where: { customer_id: req.body.customer_id },
    });

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

//get ALL
router.get("/", secretCheck, (req, res) => {
  db.Client.findAll({
    include: [db.ClientProfile, db.ClientPortfolio],
  }).then((allClient) => res.send(allClient));
});

//the :customer_id is the id of the user and NOT the id of customer_profile
router.get("/:customer_id", secretCheck, (req, res) => {
  db.Client.findOne({
    where: { customer_id: req.params.customer_id },
    include: [db.ClientProfile, db.ClientPortfolio],
  }).then((allClient) => res.send(allClient));
});

//same as here, supply the customer_id NOT the id of the MODEL customer
router.delete("/:customer_id", secretCheck, (req, res) => {
  db.Client.destroy({
    where: { customer_id: req.params.customer_id },
  }).then((allClient) => console.log("REMOVED"));
});

module.exports = router;
