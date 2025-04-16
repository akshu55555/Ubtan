import { CartModel } from "../db.js";
import jwt from 'jsonwebtoken';
const cart=async(req,res)=>{
    console.log("entered cart!")
    const{prod_id,quant,doo,dod,discount,net_price}=req.body;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    console.log(req.body);
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }
    try {

        const decoded=jwt.verify(token,"your_secret_key");
        console.log("id",decoded.id);
        const cust_id=decoded.id;
        const item = await CartModel.create({
            prod_id,
            cust_id,        
            quant,
            doo,
            dod,
            discount,
            net_price
          });
          return res.status(200).json({ message: "Item added to cart!!", item });
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: "Error adding item to cart" });
    }
}
export default cart;