import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/adminApi/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
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
                  className="btn btn-success"
                  onClick={() =>
                    approveUser(user.faculty_id, user.email, user.contactNumber)
                  }
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
