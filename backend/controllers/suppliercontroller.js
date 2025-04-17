import { SupplierModel } from "../db.js";

const supplier=async(req , res)=>{
    const {s_name,location,s_contact}=req.body;

    try{    
        const supply=await SupplierModel.create({
                s_name,location,s_contact
        })
        console.log("supplier instance created",supply);
        return res.status(200).json("supplier instance created")
    }catch(err){
        console.log("error adding supplier");
        return res.status(400).json("error adding supplier")
    }
}
export default supplier;
