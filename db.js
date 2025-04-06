import { Sequelize } from "sequelize";
import customer from './models/Customer.js';

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

// Initialize Sequelize
const sequelize = new Sequelize("Ubtan", "postgres", "forever4-5", {
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
});

// Initialize models
const CustomerModel = customer(sequelize);
export default sequelize;
export {CustomerModel };
