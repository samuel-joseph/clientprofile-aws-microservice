module.exports = (sequelize, DataTypes) => {
  const portfolio = sequelize.define("portfolio", {
    fundKey: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  portfolio.associate = (models) => {
    portfolio.belongsTo(models.user, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return portfolio;
};
