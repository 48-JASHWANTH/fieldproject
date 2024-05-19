const express = require("express");
const app = express();
require("dotenv").config();
const sqlServer = require("mssql");

const dbConfig = {
  user: process.env.user,
  password: process.env.password,
  server: process.env.server,
  database: process.env.database,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function connectToDatabase() {
  try {
    await sqlServer.connect(dbConfig);
    console.log("Connected to the SQL Server database");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

connectToDatabase();

//express error handler
app.use((error, request, response, next) => {
  response.send({ message: "error", payload: error.message });
});

//Assign port number
const port = process.env.PORT || 7777;
app.listen(port, () => console.log(`Web server running on port ${port}`));
