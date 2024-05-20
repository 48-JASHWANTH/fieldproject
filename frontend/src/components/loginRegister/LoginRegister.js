import React from "react";
import { useState } from "react";
import VideoComponent from "../videos/VideoComponent";
import "./LoginRegister.css";
import vnrlogo from "../../images/vnrlogo.png";

function LoginRegister() {
  const [isSignUp, setIsSignUp] = useState(false);

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
  return (
    <div className="main">
      <VideoComponent></VideoComponent>
      <div className="body1">
        <div className="container1" id="main">
          <div className="sign-in">
            <form action="#">
              <img src={vnrlogo} alt="" />
              <h1 className="signUpHead">SignIn</h1>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                required
              />
              <input
                type="password"
                name="Password"
                placeholder="Enter password"
                required
              />
              <a href="#">Forgot your Password?</a>
              <button>Sign In</button>
            </form>
          </div>
          <div className="sign-up">
            <form action="#">
              <img src={vnrlogo} alt="" />
              <h1 className="signUpHead">SignUp</h1>
              <input type="email" name="email" placeholder="Enter email" />
              <input type="text" name="Name" placeholder="Enter name" />
              <input
                type="password"
                name="Password"
                placeholder="Enter password"
              />
              <input
                type="tel"
                name="number"
                placeholder="Enter contact number"
              />
              <button>Sign Up</button>
            </form>
          </div>
          <div className="overlay-container1">
            <div className="overlay">
              <div className="overlay-left">
                {/* <h1>Login Here!</h1> */}
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
