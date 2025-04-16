import { ProductModel } from "../db.js";

const featured = async (req, res) => {
    try {
        // Find the 3 most recently created products
        const featuredProducts = await ProductModel.findAll({
            order: [['createdAt', 'DESC']],
            limit: 3
        });
        console.log("entered and dug")
        if (featuredProducts.length === 0) {
          return res.status(404).json({ message: 'No products found' });
        }
        
        const formattedProducts = featuredProducts.map(product => {
            // If using Sequelize, you might need to use product.dataValues or product.get()
            const p = product.dataValues || product;
            return {
                id: p.prod_id,
                name: p.p_name,
                description: p.description,
                price: p.p_price,
                image: '/frontend/src/assets/ubtan.jpg',
                dom: p.dom
            };
        });
        console.log("run")

        return res.json(formattedProducts);
    } catch(err) {
        console.error('Error fetching featured products:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

export default featured;