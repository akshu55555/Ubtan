import { DataTypes } from 'sequelize';

const cart = (sequelize) => {
  return sequelize.define('cart', {
    cart_id: {
      type: DataTypes.INTEGER,
      autoIncrement : true,
      primaryKey: true,
      
    },
    prod_id: {
      type: DataTypes.INTEGER,
      
      references: {
        model: 'products', // name of the table
        key: 'prod_id'     // primary key in products table
      }
    },
    cust_id: {
      type: DataTypes.INTEGER,
      
      references: {
        model: 'customers', // name of the table
        key: 'cust_id'      // primary key in customers table
      }
    },
    quant: {
      type: DataTypes.INTEGER
    },
    doo: {
      type: DataTypes.DATE
    },
    dod: {
      type: DataTypes.DATE
    },
    discount: {
      type: DataTypes.INTEGER
    },
    net_price: {
        type: DataTypes.DECIMAL(10, 2),
    }
  }, {
    timestamps: true,
    tableName: 'cart',
    freezeTableName: true
  });
};

export default cart;
