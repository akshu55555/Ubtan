// backend/controllers/searchcontroller.js
import { ProductModel } from "../db.js";
import { Op } from "sequelize";

const search = async (req, res) => {
  const { p_name } = req.body;
  try {
    const product = await ProductModel.findOne({
      where: {
        p_name: { // Consider exact match if the search is triggered by clicking a suggestion
          [Op.iLike]: `%${p_name}%`,
        },
      },
    });

    if (product) {
      const productDetails = {
        id: product.prod_id,
        item: product.p_name,
        description: product.description,
        price: product.p_price,
        image: product.image,
        dom: product.dom,
      };
      return res.json(productDetails);
    } else {
      // No product found
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error during search:", error);
    return res.status(500).json({ message: "Error during search" });
  }
};

export default search;