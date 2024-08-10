const express = require("express");
const adminApp = express.Router();
const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

//login
adminApp.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const { adminId, password } = req.body;
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

//for approve
adminApp.get(
  "/users",
  expressAsyncHandler(async (req, res) => {
    try {
      const pool = req.app.get("dbPool");
      const result = await pool.request().query(`
              SELECT faculty_id, email, contactNumber, approveStatus FROM facultyTable WHERE approveStatus = 0
          `);
      res.status(200).json(result.recordset);
    } catch (err) {
      console.error("Error retrieving users:", err);
      res.status(500).json({ message: "Error retrieving users" });
    }
  })
);

//To approve
adminApp.put(
  "/approve",
  expressAsyncHandler(async (req, res) => {
    const { faculty_id, email, contactNumber } = req.body;

    if (!faculty_id) {
      return res.status(400).json({ message: "Faculty ID is required" });
    }

    try {
      const pool = req.app.get("dbPool");
      await pool.request().query(`
          UPDATE facultyTable
          SET approveStatus = 1
          WHERE faculty_id = '${faculty_id}'
        `);

      res.status(200).json({ message: "Faculty member approved successfully" });
    } catch (err) {
      console.error("Error during faculty approval:", err);
      res.status(500).json({ message: "Error during faculty approval" });
    }
  })
);

//To retrieve all faculties
adminApp.get(
  "/faculties",
  expressAsyncHandler(async (req, res) => {
    try {
      const pool = req.app.get("dbPool");
      const result = await pool.request().query(`
              SELECT * FROM facultyTable
          `);
      res.status(200).json(result.recordset);
    } catch (err) {
      console.error("Error retrieving faculties:", err);
      res.status(500).json({ message: "Error retrieving faculties" });
    }
  })
);

module.exports = adminApp;
