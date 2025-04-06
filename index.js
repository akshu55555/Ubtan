import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import sequelize from './db.js';
import signup from './controllers/signupcontroller.js';
import login from './controllers/logincontroller.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app=express();
const PORT=5000;

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
 