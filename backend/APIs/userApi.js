const express = require("express");
const userApp = express.Router();
const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();


//User registration
userApp.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { userId, password, email, contactNumber } = req.body;
    if (!userId || !password || !email || !contactNumber) {
      return res
        .status(400)
        .json({
          message: "userId, password, email, and contactNumber are required",
        });
    }
    try {
      const hashedPassword = await bcryptjs.hash(password, 10);
      const pool = req.app.get("dbPool");
      await pool.request().query(`
            INSERT INTO faculty (userId, password, email, contactNumber, approveStatus) 
            VALUES ('${userId}', '${hashedPassword}', '${email}', '${contactNumber}', 0)
        `);
      res
        .status(201)
        .json({ message: "User registered successfully. Waiting for approval from admin." });
    } catch (err) {
      console.error("Error during user registration:", err);
      res.status(500).json({ message: "Error during registration" });
    }
  })
);

//User Login
userApp.post('/login',expressAsyncHandler(async(req,res)=>{
    const { userId, password } = req.body;
    if (!userId || !password) {
        return res.status(400).json({ message: 'username and password are required' });
    }
    try {
        const pool = req.app.get('dbPool');
        const result = await pool.request().query(`
            SELECT * FROM faculty WHERE userId = '${userId}'
        `);
        console.log(result)
        if (result.recordset.length > 0) {
            const dbUser = result.recordset[0];
            const passwordMatch = await bcryptjs.compare(password, dbUser.password);

            if (passwordMatch) {
                if (dbUser.approveStatus) {
                    const token = jsonwebtoken.sign({ userId: dbUser.userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
                    res.status(200).json({ message: 'Login successful',payload: token,user:dbUser });
                } else {
                    res.status(403).json({ message: 'User not approved. Please wait for admin approval.' });
                }
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            res.status(401).json({ message: 'Invalid username' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Error during login' });
    }
}))


module.exports = userApp;