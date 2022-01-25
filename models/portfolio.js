module.exports = (sequelize, DataTypes) => {
  const ClientPortfolio = sequelize.define("ClientPortfolio", {
    fundKey: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  ClientPortfolio.associate = (models) => {
    ClientPortfolio.belongsTo(models.Client, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return ClientPortfolio;
};
