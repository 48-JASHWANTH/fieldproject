import React, { useState ,useEffect} from "react";
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
    document.querySelector(".container1").classList.add("right-panel-active");
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
    document
      .querySelector(".container1")
      .classList.remove("right-panel-active");
  };

  async function onSignUpFormSubmit(userCredentials) {
    try {
      let res = await axios.post(
        "http://localhost:5000/userApi/register",
        userCredentials
      );
      if (res.status === 201) {
        setDialogMessage(res.data.message);
        setIsSignUp(false);
        document
          .querySelector(".container1")
          .classList.remove("right-panel-active");
      }
      resetSignUp();
    } catch (err) {
      setDialogMessage("Sign up failed. Please try again.");
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
    <div className="main">
      <VideoComponent />
      <div className="body1">
        <div className="container1" id="main">
          {dialogMessage && (
            <div className="dialog-box show">{dialogMessage}</div>
          )}
          <div className="sign-in">
            <form onSubmit={handleSubmitSignIn(onSignInFormSubmit)}>
              <img src={vnrlogo} alt="" />
              <h1 className="signUpHead">Sign In</h1>
              <div className="mb-3">
                <label className="form-check-label me-3">Sign In as</label>
                <input
                  type="radio"
                  className="form-check-input me-1 border-dark"
                  id="faculty"
                  value="faculty"
                  {...registerSignIn('userType')}
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
                  {...registerSignIn('userType')}
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
                  : registerSignIn("facultyId"))}
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                {...registerSignIn("password")}
              />
              <a href="#">Forgot your Password?</a>
              <button>Sign In</button>
            </form>
          </div>
          <div className="sign-up">
            <form onSubmit={handleSubmitSignUp(onSignUpFormSubmit)}>
              <img src={vnrlogo} alt="" />
              <h1 className="signUpHead">Sign Up</h1>
              <input
                type="text"
                id="facultyId"
                placeholder="Faculty ID"
                required
                {...registerSignUp("facultyId")}
              />
              <input
                type="email"
                id="email"
                placeholder="Email"
                required
                {...registerSignUp("email")}
              />
              <input
                type="tel"
                id="contactNumber"
                placeholder="Contact number"
                required
                {...registerSignUp("contactNumber")}
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                {...registerSignUp("password")}
              />
              <button>Sign Up</button>
            </form>
          </div>
          <div className="overlay-container1">
            <div className="overlay">
              <div className="overlay-left">
                <h1>Already have an account ?</h1>
                <button id="signIn" onClick={handleSignInClick}>
                  Sign In
                </button>
              </div>
              <div className="overlay-right">
                <h1>Don't have an account ?</h1>
                <button id="signUp" onClick={handleSignUpClick}>
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
