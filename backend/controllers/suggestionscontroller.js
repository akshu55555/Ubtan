import { ProductModel } from "../../db.js";
import { Op } from "sequelize";
const suggestions=async(req,res)=>{
        const{p_name}=req.body;
        try {
            const products = await ProductModel.findAll({
              attributes: ["p_name"],
              where: {
                p_name: {
                  [Op.iLike]: `%${p_name}%` // Case-insensitive partial match
                }
              },
              limit: 5 // Limit the number of suggestions
            });
        
            const suggestions = products.map(product => product.p_name);
            return res.json(suggestions);
          } catch (error) {
            console.error("Error fetching suggestions:", error);
            return res.status(500).json({ message: "Error fetching suggestions" });
          }
};
export default suggestions;
        