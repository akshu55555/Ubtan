import { SupplierModel } from "../db.js";

const viewsuppliers=async(req , res)=>{
    
    const supp=await SupplierModel.findAll({
        attributes:['supplier_id','s_name','location','s_contact']
    })
    console.log("viewed suppliers")
    return res.status(200).json(supp);
}
export default viewsuppliers;