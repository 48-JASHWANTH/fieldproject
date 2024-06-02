import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import VideoComponent from "../videos/VideoComponent";
import "./LoginRegister.css";
import vnrlogo from "../../images/vnrlogo.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userAdminLoginThunk } from "../../redux/slices/userAdminSlice";
import { useNavigate } from "react-router-dom";

function LoginRegister() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [userType, setUserType] = useState("faculty");

  const {
    register: registerSignIn,
    handleSubmit: handleSubmitSignIn,
    reset: resetSignIn,
  } = useForm();

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    reset: resetSignUp,
  } = useForm();

  let navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsSignUp(true);
    document
      .querySelector(".lr-container1")
      .classList.add("right-panel-active");
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
    document
      .querySelector(".lr-container1")
      .classList.remove("right-panel-active");
  };

  async function onSignUpFormSubmit(userCredentials) {
    let res;
    try {
      res = await axios.post(
        "http://localhost:5000/userApi/register",
        userCredentials
      );
      if (res.status === 201) {
        setDialogMessage(res.data.message);
        setIsSignUp(false);
        document
          .querySelector(".lr-container1")
          .classList.remove("right-panel-active");
      }
      resetSignUp();
    } catch (err) {
      if(err.response.status === 403){
        setDialogMessage(err.response.data.message);
      }else{
        setDialogMessage("Sign Up failed !");
      }
    }
  }

  useEffect(() => {
    if (dialogMessage) {
      const timer = setTimeout(() => {
        setDialogMessage("");
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [dialogMessage]);

  let dispatch = useDispatch();

  let { loginUserStatus, currentUser } = useSelector(
    (state) => state.userAdminLoginReducer
  );

  function onSignInFormSubmit(userCredentials) {
    dispatch(userAdminLoginThunk(userCredentials));
    resetSignIn();
  }

  useEffect(() => {
    if (loginUserStatus) {
      if (currentUser.userType === "faculty") {
        navigate("/FacultyPage");
      }
      if (currentUser.userType === "admin") {
        navigate("/AdminPage");
      }
    }
  }, [loginUserStatus]);

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <div className="lr-main">
      <VideoComponent />
      <div className="lr-body1">
        <div className="lr-container1" id="main">
          {dialogMessage && (
            <div className="dialog-box show">{dialogMessage}</div>
          )}
          <div className="lr-sign-in">
            <form
              onSubmit={handleSubmitSignIn(onSignInFormSubmit)}
              className="align-items-center"
            >
              <img src={vnrlogo} alt="" className="lr-img" />
              <h1 className="lr-signUpHead mb-2">Sign In</h1>
              <div className="mb-3">
                <label className="form-check-label me-3">Sign In as</label>
                <input
                  type="radio"
                  className="form-check-input me-1 border-dark"
                  id="faculty"
                  value="faculty"
                  {...registerSignIn("userType")}
                  checked={userType === "faculty"}
                  onChange={handleUserTypeChange}
                  required
                />
                <label htmlFor="faculty" className="form-check-label me-3">
                  Faculty
                </label>
                <input
                  type="radio"
                  className="form-check-input me-1 border-dark"
                  id="admin"
                  value="admin"
                  {...registerSignIn("userType")}
                  checked={userType === "admin"}
                  onChange={handleUserTypeChange}
                  required
                />
                <label htmlFor="admin" className="form-check-label">
                  Admin
                </label>
              </div>
              <input
                type="text"
                id="userId"
                placeholder={userType === "admin" ? "Admin ID" : "Faculty ID"}
                required
                {...(userType === "admin"
                  ? registerSignIn("adminId")
                  : registerSignIn("faculty_id"))}
                className="lr-input m-1 rounded-3"
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                {...registerSignIn("password")}
                className="lr-input m-1 rounded-3"
              />
              <a href="#" className="lr-a">
                Forgot your Password?
              </a>
              <button className="lr-button m-2 rounded-5">Sign In</button>
            </form>
          </div>
          <div className="lr-sign-up">
            <form
              onSubmit={handleSubmitSignUp(onSignUpFormSubmit)}
              className="align-items-center"
            >
              <img src={vnrlogo} alt="" className="lr-img" />
              <h1 className="lr-signUpHead">Sign Up</h1>
              <input
                type="text"
                id="faculty_id"
                placeholder="Faculty ID"
                required
                {...registerSignUp("faculty_id")}
                className="lr-input m-1 rounded-4"
              />
              <input
                type="email"
                id="email"
                placeholder="Email"
                required
                {...registerSignUp("email")}
                className="lr-input m-1 rounded-4"
              />
              <input
                type="tel"
                id="contactNumber"
                placeholder="Contact number"
                required
                {...registerSignUp("contactNumber")}
                className="lr-input m-1 rounded-4"
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                {...registerSignUp("password")}
                className="lr-input m-1 rounded-4"
              />
              <button className="lr-button m-1 rounded-5">Sign Up</button>
            </form>
          </div>
          <div className="lr-overlay-container1">
            <div className="lr-overlay">
              <div className="lr-overlay-left">
                <h1>Already have an account?</h1>
                <button
                  id="signIn"
                  onClick={handleSignInClick}
                  className="lr-button rounded-5"
                >
                  Sign In
                </button>
              </div>
              <div className="lr-overlay-right">
                <h1>Don't have an account?</h1>
                <button
                  id="signUp"
                  onClick={handleSignUpClick}
                  className="lr-button rounded-5"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
