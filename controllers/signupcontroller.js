import jsonwebtoken from 'jsonwebtoken';
import { CustomerModel } from '../db.js';

const signup = async (req, res) => {
  console.log("entered function");

  const { first_name, last_name, contact, address } = req.body;
  console.log("req.body is:", req.body);

    console.log("first name",req.body.first_name);
    console.log("last name" ,req.body.last_name)
  try {
    const sign = await CustomerModel.create({
      first_name,
      last_name,
      contact,
      address
    });

    console.log("created db");

    if (!sign) {
      console.log("error signing in!");
      return res.status(401).json({ message: "Error signing in!" });
    }

    console.log("signed in!");

    
    const userId = sign.id;

    return res.status(200).json({
      message: `Welcome ${first_name}, your ID is: ${userId}`
    });

  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export default signup;
