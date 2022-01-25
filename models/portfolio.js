module.exports = (sequelize, DataTypes) => {
  // const CustomerPortfolio = sequelize.define("CustomerPortfolio", {
  const CustomerPortfolio = sequelize.define("portfolio", {
    fundKey: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  CustomerPortfolio.associate = (models) => {
    CustomerPortfolio.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return CustomerPortfolio;
};
