import { DataTypes } from 'sequelize';

const payment = (sequelize) => {
  return sequelize.define('payment', {
    pay_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cust_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'cust_id'
      }
    },
    net_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    dop: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: true,
    tableName: 'payment',
    freezeTableName: true
  });
};

export default payment;