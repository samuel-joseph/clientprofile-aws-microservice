module.exports = (sequelize, DataType) => {
  const Client = sequelize.define("Client", {
    username: {
      type: DataType.STRING,
      allowNull: false,
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
    },
  });

  Client.associate = (models) => {
    Client.hasMany(models.PersonalFund, {
      onDelete: "cascade",
    });
    Client.hasOne(models.UserProfile, {
      onDelete: "cascade",
    });
  };

  return Client;
};
