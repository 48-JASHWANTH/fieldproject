import React from "react";
import { BrowserRouter as Router, NavLink, Outlet } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./CompleteProfile.css";

function CompleteProfile() {
  return (
    <div>
      <div className="navbar-complete bg-secondary">
        <Navbar expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto d-flex justify-content-around w-100">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="BasicInfo"
              >
                Basic Info
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="Education"
              >
                Education
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="Publications"
              >
                Publications
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="Projects"
              >
                Projects
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="Patents"
              >
                Patents
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="Nomination"
              >
                Nomination
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="Authors"
              >
                Authors
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <h2 className="m-4">Complete Profile</h2>
      <Outlet />
    </div>
  );
}

export default CompleteProfile;
