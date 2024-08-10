import React from "react";
import "./FacultyPage.css";
import MainNavBar from "../mainNavBar/MainNavBar";
//import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";

function FacultyPage() {
  return (
    <div className="fp-body">
      <MainNavBar />
      <div style={{ minHeight: "90.2vh" }} className="outlet-div">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default FacultyPage;
