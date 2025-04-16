import { Sequelize } from "sequelize";
import customer from './backend/models/Customer.js';
import product from "./backend/models/Product.js";
import cart from "./backend/models/Cart.js";


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

CartModel.belongsTo(ProductModel, { foreignKey: 'prod_id' });
ProductModel.hasMany(CartModel, { foreignKey: 'prod_id' });
// Sync models with database
sequelize.sync()
   .then(() => console.log('Database synchronized'))
   .catch(err => console.error('Error synchronizing database:', err));

export default sequelize;
export { CustomerModel , ProductModel,CartModel};