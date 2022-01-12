module.exports = (sequelize, DataType) => {
  const user = sequelize.define("user", {
    username: {
      type: DataType.STRING,
      allowNull: false,
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
    },
  });

  user.associate = (models) => {
    user.hasMany(models.portfolio, {
      onDelete: "cascade",
    });
    user.hasOne(models.profile, {
      onDelete: "cascade",
    });
  };

  return user;
};
