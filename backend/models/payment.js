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
      
      references: {
        model: 'customers',
        key: 'cust_id'
      }
    },
    net_price: {
      type: DataTypes.DECIMAL(10, 2),
      
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