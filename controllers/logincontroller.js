import CustomerModel from "../db.js";
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    console.log("Request received:", req.body);
    
    // Ensure req.body exists and has the required fields
    if (!req.body || !req.body.id || !req.body.first_name) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    
    const { id, first_name } = req.body;
    
    try {
        // findAll returns an array, but we need just one record
        const customers = await CustomerModel.findAll({
            where: { id: id }
        });
        
        // Check if any customer was found
        if (customers.length === 0) {
            console.log("ID not found!");
            return res.status(404).json({ error: "ID not found, sign up first" });
        }
        
        const customer = customers[0];
        
        // Compare customer name with provided name
        if (customer.first_name !== first_name) {
            console.log("ID and name do not match");
            return res.status(401).json({ error: "ID and name do not match!" });
        }
        
        // Create JWT token
        const token = jwt.sign({
            id: id,
            first_name: first_name
        }, "your_secret_key", { expiresIn: "1hr" });
        
        console.log("Token created!");
        
        // Set cookie and send response
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "Strict" });
        return res.status(200).json({ message: "Successful Log In!" });
        
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Server error occurred" });
    }
};

export default login;