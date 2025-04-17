import { RawMaterialModel } from "../db.js";

const rawmaterial=async(req , res)=>{
    const {m_name}=req.body;

    try{
        const raw=await RawMaterialModel.create({
            m_name
        });
        console.log("new raw material added");
    }catch(err){
        return res.status(400).json("error adding raw material")
    }
    
    
    return res.status(200).json("new raw material added");
}
export default rawmaterial;
