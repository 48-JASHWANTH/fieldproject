import React from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

function FacultyInfo() {
  return (
    <div className="row">
      <div className="col-md-2 bg-warning p-3">
        <NavLink className="nav-link" to="FacultyProfile">
          Faculty Profile
        </NavLink>
        <NavLink className="nav-link" to="PublicationsTemp">
          Publications
        </NavLink>
        <NavLink className="nav-link" to="PatentsTemp">
          Patents
        </NavLink>
        <NavLink className="nav-link" to="BookChaptersTemp">
          Book Chapters
        </NavLink>
        <NavLink className="nav-link" to="BooksTemp">
          Books
        </NavLink>
        <NavLink className="nav-link" to="FundedProjectsTemp">
          Funded Projects
        </NavLink>
        <NavLink className="nav-link" to="ConsultancyTemp">
          Consultancy
        </NavLink>
        <NavLink className="nav-link" to="ApiTemp">
          API
        </NavLink>
        <NavLink className="nav-link" to="CollaborationTemp">
          Collaboration
        </NavLink>
        <NavLink className="nav-link" to="AppraisalTemp">
          Appraisal
        </NavLink>
        <NavLink className="nav-link" to="NotificationTemp">
          Notifications
        </NavLink>
      </div>
      <div className="col-md-10 p-3">
        <Outlet />
      </div>
    </div>
  );
}

export default FacultyInfo;
