import { ProductModel } from "../db.js";

const viewproducts=async(req , res)=>{
   
    const prod=await ProductModel.findAll({
        attributes:['p_name','p_price','prod_id','description','dom']
    })
    console.log("viewed products")
    return res.status(200).json(prod);
}
export default viewproducts;