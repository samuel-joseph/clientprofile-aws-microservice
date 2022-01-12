module.exports = (sequelize, DataTypes) => {
  const PersonalFund = sequelize.define("PersonalFund", {
    fundKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  PersonalFund.associate = (models) => {
    PersonalFund.belongsTo(models.Client, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return PersonalFund;
};
