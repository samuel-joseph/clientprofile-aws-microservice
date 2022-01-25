module.exports = (sequelize, DataTypes) => {
  // const profile = sequelize.define("CustomerProfile", {
  const ClientProfile = sequelize.define("ClientProfile", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  ClientProfile.associate = (models) => {
    ClientProfile.belongsTo(models.Client, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return ClientProfile;
};
