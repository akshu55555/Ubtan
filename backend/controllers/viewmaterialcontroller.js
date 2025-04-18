import { RawMaterialModel } from "../db.js";

const viewmaterials=async(req , res)=>{
    
    const materials=await RawMaterialModel.findAll({
        attributes:['material_id','m_name']
    })
    console.log("viewed materials")
    return res.status(200).json(materials);
}
export default viewmaterials;