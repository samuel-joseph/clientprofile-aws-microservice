module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define("UserProfile", {
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

  UserProfile.associate = (models) => {
    UserProfile.belongsTo(models.Client, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return UserProfile;
};
