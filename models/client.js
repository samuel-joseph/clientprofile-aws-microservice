module.exports = (sequelize, DataType) => {
  const Client = sequelize.define("Client", {
    customer_id: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  });

  Client.associate = (models) => {
    Client.hasMany(models.ClientPortfolio, {
      onDelete: "cascade",
    });
    Client.hasOne(models.ClientProfile, {
      onDelete: "cascade",
    });
  };

  return Client;
};
