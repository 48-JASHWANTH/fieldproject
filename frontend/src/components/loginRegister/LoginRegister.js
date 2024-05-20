import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import VideoComponent from "../videos/VideoComponent";
import "./LoginRegister.css";
import vnrlogo from "../../images/vnrlogo.png";

function LoginRegister() {
  const [isSignUp, setIsSignUp] = useState(false);
  let { register, handleSubmit } = useForm();

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

  function onSignInFormSubmit(userCredentials) {
    console.log(userCredentials);
  }

  function onSignUpFormSubmit(userCredentials) {
    console.log(userCredentials);
  }

  return (
    <div className="main">
      <VideoComponent></VideoComponent>
      <div className="body1">
        <div className="container1" id="main">
          <div className="sign-in">
            <form onSubmit={handleSubmit(onSignInFormSubmit)}>
              <img src={vnrlogo} alt="" />
              <h1 className="signUpHead">Sign In</h1>
              <input type="text" id="userId" placeholder="User ID" required {...register('userId')}/>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                {...register('password')}
              />
              <a href="#">Forgot your Password?</a>
              <button>Sign In</button>
            </form>
          </div>
          <div className="sign-up">
            <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
              <img src={vnrlogo} alt="" />
              <h1 className="signUpHead">Sign Up</h1>
              <input type="text" id="userId" placeholder="User ID" required {...register('userId')}/>
              <input type="email" id="email" placeholder="Email" required {...register('email')}/>
              <input type='tel' id="contactNumber" placeholder="Contact number" required {...register('contactNumber')}/>
              <input type="password" id="password" placeholder="Password" required {...register('password')}/>
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
