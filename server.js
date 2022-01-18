const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const clientRoutes = require("./routes/client-routes");
app.use("/customer", clientRoutes);

const profileRoutes = require("./routes/profile-routes");
app.use("/profile", profileRoutes);

const portfolioRoutes = require("./routes/portfolio-routes");
const res = require("express/lib/response");
app.use("/portfolio", portfolioRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`);
  });
});
