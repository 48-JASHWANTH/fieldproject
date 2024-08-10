import React, { useState, useEffect } from "react";
import { axiosWithToken } from "../../axiosWithToken";
import "./FacultyProfile.css"; // Import the custom CSS file

const FacultyProfile = () => {
  const [faculty, setFaculty] = useState([]);

  const faculty_id = localStorage.getItem("currentFaculty");

  const fetchFacultyDetails = async () => {
    try {
      console.log("Fetching details for faculty ID:", faculty_id);
      const res = await axiosWithToken.get(
        `http://localhost:5000/userApi/FacultyProfile/${faculty_id}`
      );
      setFaculty(res.data);
    } catch (error) {
      console.error("Error fetching faculty details:", error);
    }
  };

  useEffect(() => {
    fetchFacultyDetails();
  }, []);

  if (!faculty) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container container">
      <h1 className="text-center my-4">Faculty Profile</h1>
      <div className="profile-details">
        <p>
          <strong>ID:</strong> {faculty.faculty_id}
        </p>
        <p>
          <strong>Name:</strong> {faculty.faculty_name}
        </p>
        <p>
          <strong>Display Name:</strong> {faculty.faculty_displayname}
        </p>
        <p>
          <strong>Email:</strong> {faculty.faculty_email}
        </p>
        <p>
          <strong>Phone Number:</strong> {faculty.faculty_phno}
        </p>
        <p>
          <strong>Alternate Phone Number:</strong> {faculty.faculty_phno1}
        </p>
        <p>
          <strong>Emergency Contact:</strong> {faculty.faculty_econtact}
        </p>
        <p>
          <strong>Gender:</strong> {faculty.faculty_gender}
        </p>
        <p>
          <strong>Date of Birth:</strong> {faculty.faculty_dob}
        </p>
        <p>
          <strong>Age:</strong> {faculty.faculty_age}
        </p>
        <p>
          <strong>Place of Birth:</strong> {faculty.faculty_placeOfBirth}
        </p>
        <p>
          <strong>Date of Retirement:</strong>{" "}
          {faculty.faculty_dateOfRetirement}
        </p>
        <p>
          <strong>State:</strong> {faculty.faculty_state}
        </p>
        <p>
          <strong>Marital Status:</strong> {faculty.faculty_maritalStatus}
        </p>
        <p>
          <strong>Blood Group:</strong> {faculty.faculty_bloodGroup}
        </p>
        <p>
          <strong>Nationality:</strong> {faculty.faculty_nationality}
        </p>
        <p>
          <strong>Religion:</strong> {faculty.faculty_religion}
        </p>
        <p>
          <strong>Caste:</strong> {faculty.faculty_caste}
        </p>
        <p>
          <strong>Date of Joining:</strong> {faculty.faculty_dateOfJoining}
        </p>
        <p>
          <strong>Date of Resignation:</strong>{" "}
          {faculty.faculty_dateOfResignation}
        </p>
        <p>
          <strong>Address:</strong> {faculty.faculty_address}
        </p>
        <p>
          <strong>Relieve Type:</strong> {faculty.faculty_relieveType}
        </p>
        <p>
          <strong>Relieve Reason:</strong> {faculty.faculty_relieveReason}
        </p>
        <p>
          <strong>Work Location:</strong> {faculty.faculty_workLocation}
        </p>
        <p>
          <strong>Department:</strong> {faculty.faculty_dept}
        </p>
        <p>
          <strong>Manager 1:</strong> {faculty.faculty_manager1}
        </p>
        <p>
          <strong>Manager 2:</strong> {faculty.faculty_manager2}
        </p>
        <p>
          <strong>Employment Type:</strong> {faculty.faculty_emp_type}
        </p>
        <p>
          <strong>Shift:</strong> {faculty.faculty_shift}
        </p>
        <p>
          <strong>Status:</strong> {faculty.faculty_status}
        </p>
        <p>
          <strong>PHC:</strong> {faculty.faculty_phc ? "Yes" : "No"}
        </p>
        <p>
          <strong>Health Insurance:</strong>{" "}
          {faculty.faculty_healthInsurance ? "Yes" : "No"}
        </p>
        <p>
          <strong>Designation:</strong> {faculty.faculty_designation}
        </p>
      </div>
    </div>
  );
};

export default FacultyProfile;
