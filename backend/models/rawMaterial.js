import { DataTypes } from 'sequelize';

const rawMaterial = (sequelize) => {
  return sequelize.define('RawMaterial', {
    material_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    m_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: true,
    tableName: 'raw_material',
    freezeTableName: true
  });
};

export default rawMaterial;