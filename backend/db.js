import { Sequelize } from "sequelize";
import customer from './models/Customer.js';
import product from "./models/Product.js";
import cart from "./models/Cart.js";
import supplier from "./models/supplier.js";
import supplies from "./models/supplies.js";
import rawMaterial from "./models/rawMaterial.js";
import payment from "./models/payment.js";
import admin from "./models/Admin.js";
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;


const sequelize = new Sequelize(DB_NAME || "Ubtan", DB_USER || "postgres", DB_PASS || "forever4-5", {
   host: DB_HOST || "localhost",
   dialect: "postgres",
   logging: false,
});

// Initialize models
const CustomerModel = customer(sequelize);
const ProductModel=product(sequelize);
const CartModel=cart(sequelize);
const SupplierModel = supplier(sequelize);
const RawMaterialModel = rawMaterial(sequelize);
const SuppliesModel = supplies(sequelize);
const PaymentModel = payment(sequelize);
const AdminModel=admin(sequelize);
SupplierModel.belongsToMany(RawMaterialModel, { 
   through: SuppliesModel,
   foreignKey: 'supplier_id'
 });
 RawMaterialModel.belongsToMany(SupplierModel, { 
   through: SuppliesModel,
   foreignKey: 'material_id'
 });

CustomerModel.hasMany(PaymentModel, { foreignKey: 'cust_id' });
PaymentModel.belongsTo(CustomerModel, { foreignKey: 'cust_id' });


CartModel.belongsTo(ProductModel, { foreignKey: 'prod_id' });
ProductModel.hasMany(CartModel, { foreignKey: 'prod_id' });
// Sync models with database
sequelize.sync()
   .then(() => console.log('Database synchronized'))
   .catch(err => console.error('Error synchronizing database:', err));

export default sequelize;
export { CustomerModel , ProductModel,CartModel,SupplierModel,SuppliesModel,RawMaterialModel,PaymentModel,AdminModel};