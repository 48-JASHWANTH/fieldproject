const express = require("express");
const userApp = express.Router();
const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const moment = require("moment");
const verifyToken = require("../middlewares/verifyToken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sqlServer = require("mssql");

// User registration
userApp.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { faculty_id, password, email, contactNumber } = req.body;
    if (!faculty_id || !password || !email || !contactNumber) {
      return res.status(400).json({
        message: "faculty_id, password, email, and contactNumber are required",
      });
    }
    const pool = req.app.get("dbPool");
    let checkUser = await pool.request().query(`
    SELECT faculty_id FROM facultyTable WHERE faculty_id = '${faculty_id}'
    `);
    if (checkUser.recordset.length > 0) {
      return res.status(403).json({
        message:
          "faculty_id already exists ! Please try again with new faculty_id",
      });
    }
    try {
      const hashedPassword = await bcryptjs.hash(password, 10);
      await pool.request().query(`
        INSERT INTO facultyTable (faculty_id, password, email, contactNumber) 
        VALUES ('${faculty_id}', '${hashedPassword}', '${email}', '${contactNumber}')
      `);
      res.status(201).json({
        message:
          "Registration successful ! Please wait for approval from admin",
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
    const { faculty_id, password } = req.body;
    if (!faculty_id || !password) {
      return res
        .status(400)
        .json({ message: "faculty_id and password are required" });
    }
    try {
      const pool = req.app.get("dbPool");
      const result = await pool.request().query(`
        SELECT * FROM facultyTable WHERE faculty_id = '${faculty_id}'
      `);
      if (result.recordset.length > 0) {
        const dbUser = result.recordset[0];
        const passwordMatch = await bcryptjs.compare(password, dbUser.password);
        if (passwordMatch) {
          if (dbUser.approveStatus) {
            const token = jsonwebtoken.sign(
              { faculty_id: dbUser.faculty_id },
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

//User basicInfo
userApp.post(
  "/BasicInfo",
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    console.log(req);
    let {
      faculty_id,
      faculty_name,
      faculty_displayname,
      faculty_email,
      faculty_phno,
      faculty_phno1,
      faculty_econtact,
      faculty_gender,
      faculty_dob,
      faculty_age,
      faculty_placeOfBirth,
      faculty_dateOfRetirement,
      faculty_state,
      faculty_maritalStatus,
      faculty_bloodGroup,
      faculty_nationality,
      faculty_religion,
      faculty_caste,
      faculty_dateOfJoining,
      faculty_dateOfResignation,
      faculty_address,
      faculty_relieveType,
      faculty_relieveReason,
      faculty_workLocation,
      faculty_dept,
      faculty_manager1,
      faculty_manager2,
      faculty_emp_type,
      faculty_shift,
      faculty_status,
      faculty_phc,
      faculty_healthInsurance,
      faculty_designation,
    } = req.body;

    faculty_dob = moment(faculty_dob, "YYYY-MM-DD").format("YYYY-MM-DD");
    faculty_dateOfJoining = moment(faculty_dateOfJoining, "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );
    faculty_dateOfResignation = faculty_dateOfResignation
      ? moment(faculty_dateOfResignation, "YYYY-MM-DD").format("YYYY-MM-DD")
      : null;
    faculty_dateOfRetirement = faculty_dateOfRetirement
      ? moment(faculty_dateOfRetirement, "YYYY-MM-DD").format("YYYY-MM-DD")
      : null;

    faculty_relieveType = faculty_relieveType ? 1 : 0;
    faculty_phc = faculty_phc ? 1 : 0;
    faculty_healthInsurance = faculty_healthInsurance ? 1 : 0;
    faculty_age = +faculty_age;

    try {
      const pool = req.app.get("dbPool");
      const request = pool.request();

      const query = `
        INSERT INTO basicInfoTable (
          faculty_id,
          faculty_name,
          faculty_displayname,
          faculty_email,
          faculty_phno,
          faculty_phno1,
          faculty_econtact,
          faculty_gender,
          faculty_dob,
          faculty_age,
          faculty_placeOfBirth,
          faculty_dateOfRetirement,
          faculty_state,
          faculty_maritalStatus,
          faculty_bloodGroup,
          faculty_nationality,
          faculty_religion,
          faculty_caste,
          faculty_dateOfJoining,
          faculty_dateOfResignation,
          faculty_address,
          faculty_relieveType,
          faculty_relieveReason,
          faculty_workLocation,
          faculty_dept,
          faculty_manager1,
          faculty_manager2,
          faculty_emp_type,
          faculty_shift,
          faculty_status,
          faculty_phc,
          faculty_healthInsurance,
          faculty_designation
        ) VALUES (
          '${faculty_id}',
          '${faculty_name}',
          '${faculty_displayname}',
          '${faculty_email}',
          '${faculty_phno}',
          '${faculty_phno1}',
          '${faculty_econtact}',
          '${faculty_gender}',
          '${faculty_dob}',
          ${faculty_age},
          '${faculty_placeOfBirth}',
          '${faculty_dateOfRetirement}',
          '${faculty_state}',
          '${faculty_maritalStatus}',
          '${faculty_bloodGroup}',
          '${faculty_nationality}',
          '${faculty_religion}',
          '${faculty_caste}',
          '${faculty_dateOfJoining}',
          '${faculty_dateOfResignation}',
          '${faculty_address}',
          '${faculty_relieveType}',
          '${faculty_relieveReason}',
          '${faculty_workLocation}',
          '${faculty_dept}',
          '${faculty_manager1}',
          '${faculty_manager2}',
          '${faculty_emp_type}',
          '${faculty_shift}',
          '${faculty_status}',
          ${faculty_phc},
          ${faculty_healthInsurance},
          '${faculty_designation}'
        )
      `;

      await request.query(query);
      res.status(200).send("Basic information saved successfully !!");
    } catch (err) {
      console.error("SQL error:", err);
      res.status(500).send("Error inserting data");
    }
  })
);

//User publications
userApp.post(
  "/Publications",
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    let {
      faculty_id,
      faculty_name,
      designation,
      dept,
      publicationId,
      publicationType,
      publicationTitle,
      Author_ID1,
      Author_ID2,
      Author_ID3,
      Author_ID4,
      Author_ID5,
      Author_ID6,
      Author_ID7,
      conferenceName,
      VolumeNumber,
      PageNumber,
      issueNumber,
      levelOfCirculation,
      journalName,
      dateOfPublication,
      indexedIn,
      indexProof,
      ISSNISBNnumber,
      impactFactor,
      scopus,
      webOfScience,
      SCI,
      GoogleScholar,
      UGCRated,
      ugcProof,
      hIndex,
      citationCnt,
      affiliatingInstitute,
      publisherName,
      paperLink,
      journalLink,
      proof,
      orcid_id,
      scopus_id,
      vidwan_id,
      googleScholar_id,
      technology,
      domain,
      branch,
      industry,
      foreignAuthor,
      publicationStatus,
      studentPresence,
    } = req.body;

    dateOfPublication = moment(dateOfPublication, "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );

    scopus = scopus === "Yes" ? 1 : 0;
    webOfScience = webOfScience === "Yes" ? 1 : 0;
    SCI = SCI === "Yes" ? 1 : 0;
    GoogleScholar = GoogleScholar = "Yes" ? 1 : 0;
    UGCRated = UGCRated === "Yes" ? 1 : 0;
    foreignAuthor = foreignAuthor === "Yes" ? 1 : 0;
    studentPresence = studentPresence === "Yes" ? 1 : 0;

    try {
      const pool = req.app.get("dbPool");
      const request = pool.request();

      const query = `
        INSERT INTO publicationsTable (
          publicationId,
          faculty_id,
          faculty_name,
          designation,
          dept,
          publicationType,
          publicationTitle,
          Author_ID1,
          Author_ID2,
          Author_ID3,
          Author_ID4,
          Author_ID5,
          Author_ID6,
          Author_ID7,
          conferenceName,
          VolumeNumber,
          PageNumber,
          issueNumber,
          levelOfCirculation,
          journalName,
          dateOfPublication,
          indexedIn,
          indexProof,
          ISSNISBNnumber,
          impactFactor,
          scopus,
          webOfScience,
          SCI,
          GoogleScholar,
          UGCRated,
          ugcProof,
          hIndex,
          citationCnt,
          affiliatingInstitute,
          publisherName,
          paperLink,
          journalLink,
          proof,
          orcid_id,
          scopus_id,
          vidwan_id,
          googleScholar_id,
          technology,
          domain,
          branch,
          industry,
          foreignAuthor,
          publicationStatus,
          studentPresence
        ) VALUES (
          '${publicationId}',
          '${faculty_id}',
          '${faculty_name}',
          '${designation}',
          '${dept}',
          '${publicationType}',
          '${publicationTitle}',
          '${Author_ID1}',
          '${Author_ID2}',
          '${Author_ID3}',
          '${Author_ID4}',
          '${Author_ID5}',
          '${Author_ID6}',
          '${Author_ID7}',
          '${conferenceName}',
          '${VolumeNumber}',
          '${PageNumber}',
          '${issueNumber}',
          '${levelOfCirculation}',
          '${journalName}',
          '${dateOfPublication}',
          '${indexedIn}',
          '${indexProof}',
          '${ISSNISBNnumber}',
          '${impactFactor}',
          ${scopus},
          ${webOfScience},
          ${SCI},
          ${GoogleScholar},
          ${UGCRated},
          '${ugcProof}',
          '${hIndex}',
          '${citationCnt}',
          '${affiliatingInstitute}',
          '${publisherName}',
          '${paperLink}',
          '${journalLink}',
          '${proof}',
          '${orcid_id}',
          '${scopus_id}',
          '${vidwan_id}',
          '${googleScholar_id}',
          '${technology}',
          '${domain}',
          '${branch}',
          '${industry}',
          ${foreignAuthor},
          '${publicationStatus}',
          ${studentPresence}
        )
      `;

      await request.query(query);
      res.status(200).send("Data inserted successfully");
    } catch (err) {
      console.error("SQL error:", err);
      res.status(500).send("Error inserting data");
    }
  })
);

//User projects
userApp.post(
  "/Projects",
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    let {
      project_id,
      project_type,
      faculty_id,
      author_ID1,
      author_ID2,
      author_ID3,
      dept,
      branch,
      foreign_,
      proofs,
      sponsors,
      industry,
      title,
      appliedDate,
      dateofSanction,
      domain,
      studentPresence,
      funded,
      fundingOrganization,
      budget,
      status,
    } = req.body;

    appliedDate = moment(appliedDate, "YYYY-MM-DD").format("YYYY-MM-DD");
    dateofSanction = moment(dateofSanction, "YYYY-MM-DD").format("YYYY-MM-DD");

    foreign_ = foreign_ === "Yes" ? 1 : 0;
    studentPresence = studentPresence === "Yes" ? 1 : 0;
    funded = funded === "Yes" ? 1 : 0;

    try {
      const pool = req.app.get("dbPool");
      const request = pool.request();

      const query = `
        INSERT INTO projectsTable (
          project_id,
          project_type,
          faculty_id,
          author_ID1,
          author_ID2,
          author_ID3,
          dept,
          branch,
          foreign_,
          proofs,
          sponsors,
          industry,
          title,
          appliedDate,
          dateofSanction,
          domain,
          studentPresence,
          funded,
          fundingOrganization,
          budget,
          status
        ) VALUES (
          '${project_id}',
          '${project_type}',
          '${faculty_id}',
          '${author_ID1}',
          '${author_ID2}',
          '${author_ID3}',
          '${dept}',
          '${branch}',
          ${foreign_},
          '${proofs}',
          '${sponsors}',
          '${industry}',
          '${title}',
          '${appliedDate}',
          '${dateofSanction}',
          '${domain}',
          ${studentPresence},
          ${funded},
          '${fundingOrganization}',
          '${budget}',
          '${status}'
        )
      `;

      await request.query(query);
      res.status(200).send("Data inserted successfully");
    } catch (err) {
      console.error("SQL error:", err);
      res.status(500).send("Error inserting data");
    }
  })
);

//User patents
userApp.post(
  "/Patents",
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    let {
      patentId,
      faculty_name,
      faculty_id,
      designation,
      dept,
      patentType,
      title,
      Author_ID1,
      Author_ID2,
      Author_ID3,
      Author_ID4,
      Author_ID5,
      Author_ID6,
      Author_ID7,
      Author_ID8,
      Author_ID9,
      Author_ID10,
      dateOfSubmission,
      dateOfPublication,
      dateOfGranting,
      foreign_,
      industry,
      technology,
      studentPresence,
      domain,
      proof,
      publisherName,
      patentStatus,
    } = req.body;

    dateOfSubmission = moment(dateOfSubmission, "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );
    dateOfPublication = moment(dateOfPublication, "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );
    dateOfGranting = moment(dateOfGranting, "YYYY-MM-DD").format("YYYY-MM-DD");

    foreign_ = foreign_ === "Yes" ? 1 : 0;
    studentPresence = studentPresence === "Yes" ? 1 : 0;

    try {
      const pool = req.app.get("dbPool");
      const request = pool.request();

      const query = `
        INSERT INTO patentsTable (
          patentId,
          faculty_name,
          faculty_id,
          designation,
          dept,
          patentType,
          title,
          Author_ID1,
          Author_ID2,
          Author_ID3,
          Author_ID4,
          Author_ID5,
          Author_ID6,
          Author_ID7,
          Author_ID8,
          Author_ID9,
          Author_ID10,
          dateOfSubmission,
          dateOfPublication,
          dateOfGranting,
          foreign_,
          industry,
          technology,
          studentPresence,
          domain,
          proof,
          publisherName,
          patentStatus
        ) VALUES (
          '${patentId}',
          '${faculty_name}',
          '${faculty_id}',
          '${designation}',
          '${dept}',
          '${patentType}',
          '${title}',
          '${Author_ID1}',
          '${Author_ID2}',
          '${Author_ID3}',
          '${Author_ID4}',
          '${Author_ID5}',
          '${Author_ID6}',
          '${Author_ID7}',
          '${Author_ID8}',
          '${Author_ID9}',
          '${Author_ID10}',
          '${dateOfSubmission}',
          '${dateOfPublication}',
          '${dateOfGranting}',
          ${foreign_},
          '${industry}',
          '${technology}',
          ${studentPresence},
          '${domain}',
          '${proof}',
          '${publisherName}',
          '${patentStatus}'
        )
      `;

      await request.query(query);
      res.status(200).send("Data inserted successfully");
    } catch (err) {
      console.error("SQL error:", err);
      res.status(500).send("Error inserting data");
    }
  })
);

//User nominations
userApp.post(
  "/Nomination",
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    let {
      faculty_id,
      nomine_name,
      nomine_relation,
      nomine_percentage,
      nomine_dateOfBirth,
      nomine_contiguencyOfHappening,
      nomine_address,
      nomine_remarks,
      nomine_aadharNumber,
      nomine_id,
    } = req.body;

    nomine_dateOfBirth = moment(nomine_dateOfBirth, "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );

    try {
      const pool = req.app.get("dbPool");
      const request = pool.request();

      const query = `
        INSERT INTO nomineeTable (
          faculty_id,
          nomine_name,
          nomine_relation,
          nomine_percentage,
          nomine_dateOfBirth,
          nomine_contiguencyOfHappening,
          nomine_address,
          nomine_remarks,
          nomine_aadharNumber,
          nomine_id
        ) VALUES (
          '${faculty_id}',
          '${nomine_name}',
          '${nomine_relation}',
          '${nomine_percentage}',
          '${nomine_dateOfBirth}',
          '${nomine_contiguencyOfHappening}',
          '${nomine_address}',
          '${nomine_remarks}',
          '${nomine_aadharNumber}',
          '${nomine_id}'
        )
      `;

      await request.query(query);
      res.status(200).send("Data inserted successfully");
    } catch (err) {
      console.error("SQL error:", err);
      res.status(500).send("Error inserting data");
    }
  })
);

//User authors
userApp.post(
  "/Authors",
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    let {
      author_name,
      author_ID,
      author_institute,
      author_email,
      author_phno,
      author_gender,
      is_author_from_industry = false,
      author_state,
      author_country,
      is_author_student = false,
      is_author_foreign = false,
    } = req.body;

    is_author_from_industry = is_author_from_industry === "Yes" ? 1 : 0;
    is_author_student = is_author_student === "Yes" ? 1 : 0;
    is_author_foreign = is_author_foreign === "Yes" ? 1 : 0;

    try {
      const pool = req.app.get("dbPool");
      const request = pool.request();

      const query = `
        INSERT INTO authorsTable (
          author_name,
          author_ID,
          author_institute,
          author_email,
          author_phno,
          author_gender,
          is_author_from_industry,
          author_state,
          author_country,
          is_author_student,
          is_author_foreign
        ) VALUES (
          '${author_name}',
          '${author_ID}',
          '${author_institute}',
          '${author_email}',
          '${author_phno}',
          '${author_gender}',
          ${is_author_from_industry},
          '${author_state}',
          '${author_country}',
          ${is_author_student},
          ${is_author_foreign}
        )
      `;

      await request.query(query);
      res.status(200).send("Data inserted successfully");
    } catch (err) {
      console.error("SQL error:", err);
      res.status(500).send("Error inserting data");
    }
  })
);

userApp.get(
  "/FacultyProfile/:faculty_id",
  verifyToken,
  expressAsyncHandler(async (req, res) => {
    const faculty_id = req.params.faculty_id;
    if (!faculty_id) {
      return res.status(400).json({ message: "Faculty ID is required" });
    }

    try {
      const pool = req.app.get("dbPool");
      const result = await pool
        .request()
        .input("faculty_id", faculty_id)
        .query("SELECT * FROM basicInfoTable WHERE faculty_id = @faculty_id");

      if (result.recordset.length === 0) {
        return res.status(404).json({ message: "Faculty not found" });
      }

      res.json(result.recordset[0]);
    } catch (err) {
      console.error("Error during faculty profile retrieval:", err);
      res
        .status(500)
        .json({ message: "Error during faculty profile retrieval" });
    }
  })
);

//Forget password
userApp.post(
  "/ForgetPassword",
  expressAsyncHandler(async (req, res) => {
    //console.log(req.body)
    const { email } = req.body;
    const pool = req.app.get("dbPool");

    try {
      const result = await pool
        .request()
        .input("email", sqlServer.NVarChar, email)
        .query("SELECT * FROM FacultyTable WHERE email = @email");

      //console.log(result)

      if (result.recordset.length === 0) {
        return res
          .status(400)
          .json({ message: "User with this email does not exist." });
      }
      //console.log(result.recordset)
      const token = jsonwebtoken.sign(
        { faculty_id: result.recordset[0].faculty_id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      //console.log(token)
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.user1,
          pass: process.env.pass1,
        },
      });
      console.log(result.recordset[0].faculty_id);
      var mailOptions = {
        from: process.env.user1,
        to: `${email}`,
        subject: "Reset your password",
        text: `http://localhost:5000/resetPassword/${result.recordset[0].faculty_id}/${token}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          return res.status(200).json({ message: "Success" });
        }
      });
    } catch (error) {
      console.error("Error in forgot password:", error);
      res.status(500).send("Server error.");
    }
  })
);

//Reset password
userApp.post(
  "/ResetPassword/:id/:token",
  expressAsyncHandler(async (req, res) => {
    const { id: faculty_id, token } = req.params;
    const { password } = req.body;

    jsonwebtoken.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.json({ Status: "Error with token" });
      } else {
        try {
          const pool = req.app.get("dbPool");

          const hashedPassword = await bcryptjs.hash(password, 10);

          const result = await pool
            .request()
            .input("faculty_id", sqlServer.NVarChar, faculty_id)
            .input("hashedPassword", sqlServer.NVarChar, hashedPassword) // Provide hashedPassword directly as input
            .query(
              "UPDATE facultyTable SET password = @hashedPassword WHERE faculty_id = @faculty_id"
            );

          if (result.rowsAffected[0] === 0) {
            return res.status(400).json({ Status: "Error updating password" });
          }

          return res.json({ Status: "Password updated successfully" });
        } catch (error) {
          console.error("Error resetting password:", error);
          return res.status(500).send("Server error.");
        }
      }
    });
  })
);

module.exports = userApp;
