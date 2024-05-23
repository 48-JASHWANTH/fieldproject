import React from "react";
import "./FacultyPage.css";
import NavBar from '../navbar/Navbar'
import Footer from "../footer/Footer";
import {Outlet} from 'react-router-dom'

function FacultyPage() {
  return (
    <div className="fp-body">
      <NavBar />
      <div style={{ minHeight: "82vh" }} className="outlet-div">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default FacultyPage;
