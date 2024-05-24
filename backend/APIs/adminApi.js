const express = require("express");
const adminApp = express.Router();
const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

//Admin Login
adminApp.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    //console.log(req.body)
    const { adminId, password } = req.body;
    //console.log(adminId)
    //console.log(password)
    if (!adminId || !password) {
      return res
        .status(400)
        .json({ message: "AdminId and password are required" });
    }
    try {
      const pool = req.app.get("dbPool");
      const result = await pool.request().query(`
              SELECT * FROM adminTable WHERE adminId = '${adminId}'
          `);
      //console.log(result)
      if (result.recordset.length > 0) {
        const dbAdmin = result.recordset[0];
        const passwordMatch = await bcryptjs.compare(
          password,
          dbAdmin.password
        );

        if (passwordMatch) {
          const token = jsonwebtoken.sign(
            { userId: dbAdmin.adminId },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );
          res.status(200).json({
            message: "Login successful",
            payload: token,
            user: dbAdmin,
          });
        } else {
          res.status(401).json({ message: "Invalid password" });
        }
      } else {
        res.status(401).json({ message: "Invalid userId" });
      }
    } catch (err) {
      console.error("Error during login:", err);
      res.status(500).json({ message: "Error during login" });
    }
  })
);

module.exports = adminApp