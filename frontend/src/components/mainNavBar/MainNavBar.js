import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MainNavBar.css";
import { useSelector } from "react-redux";
import { resetState } from "../../redux/slices/userAdminSlice";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const MainNavBar = () => {
  let { loginUserStatus, currentUser } = useSelector(
    (state) => state.userAdminLoginReducer
  );

  let dispatch = useDispatch();

  function signOut() {
    //remove token from local storage
    localStorage.removeItem("token");
    dispatch(resetState());
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
      <Nav className="navbar-right ">
        <NavLink className="nav-link" to="/" onClick={signOut}>
          SignOut
        </NavLink>
      </Nav>
    </Navbar>
  );
};

export default MainNavBar;
