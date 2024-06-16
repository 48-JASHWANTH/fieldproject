import React from "react";
import "./ErrorPage.css";
import errorImage from "../../images/error.jpg";
import {useNavigate} from 'react-router-dom'

function ErrorPage() {

  const navigate = useNavigate()

  function handleGoBack(){
    navigate('')
  }
  
  return (
    <div className="error-container">
      <img src={errorImage} alt="Error" className="error-image" />
      <h1 className="error-title">Oops! Something went wrong.</h1>
      <p className="error-message">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <button className="error-button" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  );
}

export default ErrorPage;
