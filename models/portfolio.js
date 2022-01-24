module.exports = (sequelize, DataTypes) => {
  const CustomerPortfolio = sequelize.define("CustomerPortfolio", {
    fundKey: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  CustomerPortfolio.quantity = 1;

  CustomerPortfolio.associate = (models) => {
    CustomerPortfolio.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return CustomerPortfolio;
};
