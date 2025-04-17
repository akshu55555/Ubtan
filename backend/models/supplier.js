import { DataTypes } from 'sequelize';

const supplier = (sequelize) => {
  return sequelize.define('supplier', {
    supplier_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    s_name: {
      type: DataTypes.STRING,
      
    },
    location: {
      type: DataTypes.STRING
    },
    s_contact: {
      type: DataTypes.STRING,
      
    }
  }, {
    timestamps: true,
    tableName: 'supplier',
    freezeTableName: true
  });
};

export default supplier;