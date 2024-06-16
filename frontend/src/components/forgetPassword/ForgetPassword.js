import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./ForgetPassword.css";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function onSubmit(data) {
    //console.log(data);
    try {
      const res = await axios.post(
        "http://localhost:5000/userApi/ForgetPassword",
        data
      );
      if (res.data.message === "Success") {
        alert("Reset link has been sent to your mail...!");
        navigate("/");
      }
    } catch (error) {
      alert("Error sending email.");
    }
  }

  return (
    <div className="forgot-password-container d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="forgot-password-form">
        <h2 className="forgot-password-title">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          required
          {...register("email")}
          className="forgot-password-input"
        />
        <button type="submit" className="forgot-password-button">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
