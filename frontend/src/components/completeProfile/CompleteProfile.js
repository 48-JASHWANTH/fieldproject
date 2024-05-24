import React from "react";
import { NavLink,Outlet } from "react-router-dom";
import "./CompleteProfile.css";

function CompleteProfile() {
  return (
    <div>
      <div className="bg-warning d-flex justify-content-around">
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
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default CompleteProfile;
