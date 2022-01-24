module.exports = (sequelize, DataTypes) => {
  const CustomerPortfolio = sequelize.define("CustomerPortfolio", {
    fundKey: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
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
