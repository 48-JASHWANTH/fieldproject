import React from "react";
import { BrowserRouter as Router, NavLink, Outlet } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./CompleteProfile.css";

function CompleteProfile() {
  return (
    <div>
      <div className="navbar-complete">
        <Navbar expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto d-flex justify-content-around w-100">
              <NavLink className="nav-link" to="BasicInfo">
                Basic Info
              </NavLink>
              <NavLink className="nav-link" to="Education">
                Education
              </NavLink>
              <NavLink className="nav-link" to="Publications">
                Publications
              </NavLink>
              <NavLink className="nav-link" to="Projects">
                Projects
              </NavLink>
              <NavLink className="nav-link" to="Patents">
                Patents
              </NavLink>
              <NavLink className="nav-link" to="Nomination">
                Nomination
              </NavLink>
              <NavLink className="nav-link" to="Authors">
                Authors
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <Outlet />
    </div>
  );
}

export default CompleteProfile;
