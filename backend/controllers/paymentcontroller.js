
import { PaymentModel } from "../db.js";
import { CartModel } from "../db.js";
import { ProductModel } from "../db.js";
import jwt from 'jsonwebtoken';

const payment = async (req, res) => {
  console.log("entered payment");
  
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token missing or invalid' });
  }

  const token = authHeader.split(' ')[1];
  let payload;

  try {
    payload = jwt.verify(token, 'your_secret_key');
    const cust_id = payload.id;
    console.log("id", cust_id);

    // Find the cart details
    const cartItems = await CartModel.findAll({
      where: { cust_id },
      include: [{
        model: ProductModel,
        attributes: ['p_name', 'p_price']
      }]
    });
  
  if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: 'Cart not found for this customer' });
  }
  
  // Calculate total amount from cart items
  let totalAmount = cartItems.reduce((sum, item) => {
      return sum + (parseFloat(item.net_price) || 0);
  }, 0);
  
  const dop = new Date();
  
  // Create payment record
  const pay = await PaymentModel.create({
      cust_id,
      net_price: totalAmount,
      dop
  });
  
  //delete cart items for that customer
  await CartModel.destroy({
    where: { cust_id }
  });

    console.log("payment added!", pay);
    return res.status(200).json({ message: "payment added!", payment: pay });

  } catch (err) {
    console.error('Error processing payment:', err);
    return res.status(500).json({ 
      message: 'Error processing payment',
      error: err.message 
    });
  }
};

export default payment;