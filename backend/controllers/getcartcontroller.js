import {CartModel, ProductModel} from '../db.js';

import jwt from 'jsonwebtoken';


const getcart=async(req,res)=>{
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    
    const decoded=jwt.verify(token,"your_secret_key");
    if(!decoded){
        return res.status(402).json("token not authorized!");
    }
    console.log("cust_id",decoded.id);

    const cust_id=decoded.id;

    try{
        const cartdetails = await CartModel.findAll({
            where: { cust_id },
            include: [
              {
                model: ProductModel,
                attributes: [['p_name','name']]
              }
            ]
          });

          

        console.log("cart details",cartdetails);
        return res.status(200).json(cartdetails);
    }catch(err){
        console.log("error");
        return res.status(402).json("error in fetching cart!");
    }
        

}
export default getcart;