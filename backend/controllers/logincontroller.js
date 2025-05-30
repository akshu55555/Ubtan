import {AdminModel, CustomerModel} from '../db.js';
import jwt from 'jsonwebtoken';

const login=async(req,res) =>{
    
        const{id,first_name,usertype}=req.body;
        if(usertype==="customer"){
            const customer=await CustomerModel.findOne({
                attributes:["id","first_name"],
                where:{
                    id:id,
                }
            })
    
            if(first_name!=customer.first_name){
                    return res.status(402).json({message:" incorrect id!"});
            }
            let token;
            try{
    
                token = jwt.sign(
                    {id:customer.id , first_name:customer.first_name },
                    "your_secret_key",
                    {expiresIn:'1h'}
                )
               // res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "Strict" });
                console.log("login successful");
                res.json({ message: "Login successful", token: token });
    
    
            }catch(err){
                return res.status(403).json({message:"error generating token"})
            }
    
    
        }else if(usertype==="admin"){
            const admin=await AdminModel.findOne({
                attributes:["id","first_name"],
                where:{
                    id:id,
                }
            })
    
            if(first_name!=admin.first_name){
                    return res.status(402).json({message:" incorrect id!"});
            }
            let token;
            try{
    
                token = jwt.sign(
                    {id:admin.id , first_name:admin.first_name },
                    "your_secret_key",
                    {expiresIn:'1h'}
                )
                res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "Strict" });
                console.log("login successful");
                res.json({ message: "Login successful", token: token });
    
    
            }catch(err){
                return res.status(403).json({message:"error generating token"})
            }
    
    
        }
        
    }

export default login;