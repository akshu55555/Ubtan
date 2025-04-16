import { DataTypes } from 'sequelize';

const supplies = (sequelize) => {
  return sequelize.define('supplies', {
    supply_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'supplier',
        key: 'supplier_id'
      }
    },
    material_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'raw_material',
        key: 'material_id'
      }
    },
    material_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    material_quant: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: true,
    tableName: 'supplies',
    freezeTableName: true
  });
};

export default supplies;    