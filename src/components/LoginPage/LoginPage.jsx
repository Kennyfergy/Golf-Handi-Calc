import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const history = useHistory();

  return (
    <header className="login-background">
      <div className="login-form">
        <LoginForm />
        <div className="center-button">
          <button
            type="button"
            className="loginButton"
            onClick={() => {
              history.push("/registration");
            }}
          >
            Register
          </button>
        </div>
      </div>
    </header>
  );
}

export default LoginPage;
