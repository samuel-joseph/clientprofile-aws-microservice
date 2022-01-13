module.exports = (sequelize, DataType) => {
  const Customer = sequelize.define("Customer", {
    customer_id: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  });

  Customer.associate = (models) => {
    Customer.hasMany(models.CustomerPortfolio, {
      onDelete: "cascade",
    });
    Customer.hasOne(models.CustomerProfile, {
      onDelete: "cascade",
    });
  };

  return Customer;
};
