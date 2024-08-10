import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchFaculties();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/adminApi/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchFaculties = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/adminApi/faculties"
      );
      setFaculties(response.data);
    } catch (error) {
      console.error("Error fetching faculties:", error);
    }
  };

  const approveUser = async (faculty_id, email, contactNumber) => {
    try {
      await axios.put("http://localhost:5000/adminApi/approve", {
        faculty_id,
        email,
        contactNumber,
      });
      setUsers(users.filter((user) => user.faculty_id !== faculty_id));
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const disapproveUser = async (faculty_id) => {
    try {
      await axios.put("http://localhost:5000/adminApi/disapprove", {
        faculty_id,
      });
      setUsers(users.filter((user) => user.faculty_id !== faculty_id));
    } catch (error) {
      console.error("Error disapproving user:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Unapproved Users</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Faculty ID</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.faculty_id}>
              <td>{user.faculty_id}</td>
              <td>{user.email}</td>
              <td>{user.contactNumber}</td>
              <td>
                <button
                  className="btn btn-success me-2"
                  onClick={() =>
                    approveUser(user.faculty_id, user.email, user.contactNumber)
                  }
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => disapproveUser(user.faculty_id)}
                >
                  Disapprove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>All Faculties</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Faculty ID</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Approve Status</th>
          </tr>
        </thead>
        <tbody>
          {faculties.map((faculty) => (
            <tr key={faculty.faculty_id}>
              <td>{faculty.faculty_id}</td>
              <td>{faculty.email}</td>
              <td>{faculty.contactNumber}</td>
              <td>{faculty.approveStatus ? "Approved" : "Unapproved"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
