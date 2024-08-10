import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./ResetPassword.css";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {id, token} = useParams()

  async function onSubmit(data) {
    console.log(data);
    try {
      const res = await axios.post(
        `http://localhost:5000/userApi/ResetPassword/${id}/${token}`,
        data
      );
      alert("Your password has been successfully reset. You can now log in with your new password.");
      if (res.data.Status === "Password updated successfully") {
        navigate("/");
      }
    } catch (error) {
      alert("Mail doesn't exist please try again...!");
    }
  }

  return (
    <div className="reset-password-container d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="forgot-password-form">
        <h2 className="forgot-password-title">Reset Password</h2>
        <input
          type="password"
          placeholder="Enter Password"
          required
          {...register("password")}
          className="reset-password-input"
        />
        <button type="submit" className="reset-password-button">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
