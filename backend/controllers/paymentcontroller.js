import { PaymentModel } from "../db.js";
import { CartModel } from "../db.js";
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
    const cartdetails = await CartModel.findOne({
      attributes: ['cust_id', 'doo', 'net_price'],
      where: { cust_id: cust_id }
    });

    if (!cartdetails) {
      return res.status(404).json({ message: 'Cart not found for this customer' });
    }

    // Convert net_price to number if it's a string
    const net_price = parseFloat(cartdetails.net_price) || 0;
    const dop = new Date(); // Use current date as payment date

    // Create payment record
    const pay = await PaymentModel.create({
      cust_id,
      net_price,
      dop
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