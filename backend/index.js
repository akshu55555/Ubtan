import express from 'express';

import sequelize from './db.js';
import signup from './controllers/signupcontroller.js';
import login from './controllers/logincontroller.js';
import search from './controllers/searchcontroller.js';
import cart from './controllers/cartcontroller.js';
import getcart from './controllers/getcartcontroller.js';
import suggestions from './controllers/suggestionscontroller.js';
import cookieParser from 'cookie-parser';
import featured from './controllers/featuredcontroller.js';
import rawmaterial from './controllers/rawmaterialcontroller.js';
import supplier from './controllers/suppliercontroller.js';
import payment from './controllers/paymentcontroller.js';
import product from './controllers/addproductcontroller.js';
import cors from 'cors';
const app=express();
const PORT=5000;
import dotenv from 'dotenv';

dotenv.config();
app.use(cookieParser());
app.use(express.json({strict:false}));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true // If you're using cookies or auth headers
      }));
//authenticate sequelize

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected successfully!");
    app.listen(PORT, () => {
      console.log("You have reached ubtan server! Happy shopping!");
    });
  })
  .catch((err) => {
    console.error(" Database connection failed:", err);
  });


app.use('/signup',signup);
app.use('/login',login);
app.use('/search',search);
app.use('/cart',cart);
app.use('/getcart',getcart);
app.use('/suggestions',suggestions);
app.use('/featured-products',featured);
app.use('/rawmaterial',rawmaterial);
app.use('/supplier',supplier);
app.use('/payment',payment);
app.use('/addproduct',product);