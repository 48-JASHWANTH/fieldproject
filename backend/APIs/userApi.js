const express = require("express");
const userApp = express.Router();
const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

// User registration
userApp.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { facultyId, password, email, contactNumber } = req.body;
    if (!facultyId || !password || !email || !contactNumber) {
      return res.status(400).json({
        message: "facultyId, password, email, and contactNumber are required",
      });
    }
    const pool = req.app.get("dbPool");
    let checkUser = await pool.request().query(`
    SELECT facultyId FROM facultyTable WHERE facultyId = '${facultyId}'
    `);
    if (checkUser.recordset.length > 0) {
      return res
        .status(409)
        .json({
          message: "facultyId already exists ! Please try again with new facultyId",
        });
    }
    try {
      const hashedPassword = await bcryptjs.hash(password, 10);
      await pool.request().query(`
        INSERT INTO facultyTable (facultyId, password, email, contactNumber) 
        VALUES ('${facultyId}', '${hashedPassword}', '${email}', '${contactNumber}')
      `);
      res.status(201).json({
        message: "Registration successful ! Please wait for approval from admin",
      });
    } catch (err) {
      console.error("Error during user registration:", err);
      res.status(500).json({ message: "Error during registration" });
    }
  })
);

// User Login
userApp.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    //console.log(req.body);
    const { facultyId, password } = req.body;
    if (!facultyId || !password) {
      return res.status(400).json({ message: "facultyId and password are required" });
    }
    try {
      const pool = req.app.get("dbPool");
      const result = await pool.request().query(`
        SELECT * FROM facultyTable WHERE facultyId = '${facultyId}'
      `);
      if (result.recordset.length > 0) {
        const dbUser = result.recordset[0];
        const passwordMatch = await bcryptjs.compare(password, dbUser.password);
        if (passwordMatch) {
          if (dbUser.approveStatus) {
            const token = jsonwebtoken.sign(
              { facultyId: dbUser.facultyId },
              process.env.JWT_SECRET,
              { expiresIn: "1d" }
            );
            res.status(200).json({
              message: "Login successful",
              payload: token,
              user: dbUser,
            });
          } else {
            res.status(403).json({
              message: "User not approved. Please wait for admin approval.",
            });
          }
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

module.exports = userApp;
