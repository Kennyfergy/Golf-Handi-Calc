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
        {/* <div style={{ backgroundImage: `url(${backgroundImage})` }}> */}
        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              history.push("/registration");
            }}
          >
            Register
          </button>
        </center>
      </div>
    </header>
  );
}

export default LoginPage;
