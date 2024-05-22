const express = require("express");
const app = express();
require("dotenv").config();
const sqlServer = require("mssql");
const path = require("path");

//Importing API routes
const userApp = require("./APIs/userApi");
const adminApp = require("./APIs/adminApi");

//deploying react bulid in this server
app.use(express.static(path.join(__dirname, "../frontend/build")));

const dbConfig = {
  user: process.env.user,
  password: process.env.password,
  server: process.env.server,
  database: process.env.database,
  options: {
    encrypt: true,
    trustServerCertificate: true,
    connectTimeout: 86400000,
  },
};

async function connectToDatabase() {
  try {
    const pool = await sqlServer.connect(dbConfig);
    console.log("Connected to the SQL Server database");
    app.set("dbPool", pool);
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

connectToDatabase();

//To parse the body of request
app.use(express.json());

app.use("/userApi", userApp);
app.use("/adminApi", adminApp);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

//Error handling
app.use((error, request, response, next) => {
  response.send({ message: "error", payload: error.message });
});

//Assigning port number
const port = process.env.PORT || 7777;
app.listen(port, () => console.log(`Web server running on port ${port}`));
