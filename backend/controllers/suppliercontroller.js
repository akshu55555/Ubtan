import { SupplierModel } from "../db.js";

const supplier = async(req, res) => {
    console.log("entered supplier");
    const {s_name, location, s_contact} = req.body;
    console.log("Full request body:", req.body);
    console.log("Extracted data:", { s_name, location, s_contact });
    
    // Validation check
    if (!s_name) {
        console.log("Missing required field: s_name");
        return res.status(400).json("Supplier name is required");
    }
    
    if (!s_contact) {
        console.log("Missing required field: s_contact");
        return res.status(400).json("Supplier contact is required");
    }
    
    try {
        console.log("Attempting to create supplier...");
        const supply = await SupplierModel.create({
            s_name,
            location,
            s_contact
        });
        
        console.log("Supplier created successfully:", supply.toJSON());
        return res.status(200).json("supplier instance created");
    } catch(err) {
        console.error("Error adding supplier:", err.message);
        console.error("Error stack:", err.stack);
        return res.status(400).json({
            message: "Error adding supplier", 
            error: err.message
        });
    }
}

export default supplier;