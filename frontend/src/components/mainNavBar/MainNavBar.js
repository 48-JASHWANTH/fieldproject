import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MainNavBar.css";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { resetState } from "../../redux/slices/userAdminSlice";
import { axiosWithToken } from "../../axiosWithToken";

const MainNavBar = () => {
  let { loginUserStatus, currentUser } = useSelector(
    (state) => state.userAdminLoginReducer
  );

  const [submitStatus, setSubmitStatus] = useState(null);
  const navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    // Assume faculty_id is available in local storage or from the currentUser state
    const facultyId = localStorage.getItem("currentFaculty");

    if (facultyId) {
      // Fetch the formSubmitStatus from the API
      const fetchSubmitStatus = async () => {
        try {
          const response = await axiosWithToken.get(
            `http://localhost:5000/userApi/GetFormSubmitStatus/${facultyId}`
          );
          console.log(response.data.formSubmitStatus);
          setSubmitStatus(response.data.formSubmitStatus);
        } catch (error) {
          console.error("Error fetching submit status:", error);
        }
      };

      fetchSubmitStatus();
    }
  }, []);

  function signOut() {
    // Remove token and currentFaculty from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("currentFaculty");
    dispatch(resetState());
    navigate("/");
  }

  return (
    <Navbar
      className="navbar-custom px-2 d-flex justify-content-between"
      expand="lg"
    >
      <Navbar.Brand className="d-flex align-items-center" href="#">
        <img
          src="https://pbs.twimg.com/profile_images/1688442970587201536/dCewVE4I_400x400.jpg"
          alt="VNRVJIET Logo"
          height="40"
          className="px-2"
        />{" "}
        VNRVJIET
      </Navbar.Brand>
      <Nav className="navbar-right d-flex align-items-center">
        {/* Conditionally render the Complete Profile link */}
        {submitStatus === 1 && (
          <NavLink
            className="nav-link"
            to="/FacultyPage/CompleteProfile/Publications"
          >
            Complete Profile
          </NavLink>
        )}
        <NavLink className="nav-link" to="/" onClick={signOut}>
          SignOut
        </NavLink>
      </Nav>
    </Navbar>
  );
};

export default MainNavBar;
