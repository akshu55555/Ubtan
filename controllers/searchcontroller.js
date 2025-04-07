import { ProductModel } from "../db.js";

const search=async(req,res)=>{
        const{p_name}=req.body;

        console.log("name",p_name);

        const find=await ProductModel.findOne({
            attributes:["prod_id","p_name","p_price","dom","description"],
            where:{
                p_name:p_name
            }
        }) 
        console.log("find",find.prod_id);

        if(!find){
            console.log("not found!");
            return res.status(402).json("product not available!!");
        }

       return res.json({
            id:find.prod_id,
            item: find.p_name,
            price: find.p_price,
            description: find.description,
            dom:find.dom
          });
      
}
export default search;