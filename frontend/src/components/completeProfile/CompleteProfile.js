import React from "react";
import { BrowserRouter as Router, NavLink, Outlet } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./CompleteProfile.css";

function CompleteProfile() {
  return (
    <div>
      <div className="progress-container">
        <div className="step">
          <NavLink
            to="BasicInfo"
            className={({ isActive }) =>
              isActive ? "active step-link" : "step-link"
            }
          >
            <div className="step-icon">🔒</div>
            <p className="step-label">Basic Info</p>
          </NavLink>
        </div>
        <div className="step">
          <NavLink
            to="Education"
            className={({ isActive }) =>
              isActive ? "active step-link" : "step-link"
            }
          >
            <div className="step-icon">🎓</div>
            <p className="step-label">Education</p>
          </NavLink>
        </div>
        <div className="step">
          <NavLink
            to="Publications"
            className={({ isActive }) =>
              isActive ? "active step-link" : "step-link"
            }
          >
            <div className="step-icon">📄</div>
            <p className="step-label">Publications</p>
          </NavLink>
        </div>
        <div className="step">
          <NavLink
            to="Projects"
            className={({ isActive }) =>
              isActive ? "active step-link" : "step-link"
            }
          >
            <div className="step-icon">📊</div>
            <p className="step-label">Projects</p>
          </NavLink>
        </div>
        <div className="step">
          <NavLink
            to="Patents"
            className={({ isActive }) =>
              isActive ? "active step-link" : "step-link"
            }
          >
            <div className="step-icon">💡</div>
            <p className="step-label">Patents</p>
          </NavLink>
        </div>
        <div className="step">
          <NavLink
            to="Nomination"
            className={({ isActive }) =>
              isActive ? "active step-link" : "step-link"
            }
          >
            <div className="step-icon">🏆</div>
            <p className="step-label">Nomination</p>
          </NavLink>
        </div>
        <div className="step">
          <NavLink
            to="Authors"
            className={({ isActive }) =>
              isActive ? "active step-link" : "step-link"
            }
          >
            <div className="step-icon">✍️</div>
            <p className="step-label">Authors</p>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default CompleteProfile;
