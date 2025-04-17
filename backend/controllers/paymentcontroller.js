import { PaymentModel } from "../db.js";
import jwt from 'jsonwebtoken';
const payment=async(req ,res)=>{
    const authHeader = req.headers.authorization;
    const{net_price,dop}=req.body;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token missing or invalid' });
  }

  const token = authHeader.split(' ')[1];
  let payload;

  try {
    payload = jwt.verify(token, 'your_secret_key'); // decode token
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return res.status(403).json({ message: 'Invalid token' });
  }

  const cust_id=payload.id;
  console.log("id",cust_id);

  try{
    const pay=await PaymentModel.create({
        cust_id,net_price,dop 
      })
      console.log("payment added!");
  }catch(err){
    console.log("error adding payment");
    return res.status(400).json("error adding payment");
  }
  
  return res.status(200).json("payment added!");
  
}
export default payment;