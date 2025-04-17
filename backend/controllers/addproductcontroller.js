import { ProductModel } from "../db.js";


const product=async(req , res)=>{
    const {prod_id,p_name,p_price,dom,description,image}=req.body;

    try{
        const added=await ProductModel.create({
            prod_id,p_name,p_price,description,dom,image
        });
        console.log("new product  added");
    }catch(err){
        return res.status(400).json("error adding product")
    }
    
    
    return res.status(200).json("new product added");
}
export default product;