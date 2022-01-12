module.exports = (sequelize, DataTypes) => {
  const profile = sequelize.define("profile", {
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

  profile.associate = (models) => {
    profile.belongsTo(models.user, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return profile;
};
