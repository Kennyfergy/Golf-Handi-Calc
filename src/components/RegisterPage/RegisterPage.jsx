import React from "react";

import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";

function RegisterPage() {
  const history = useHistory();

  return (
    <header className="login-background">
      <div className="login-form">
        <RegisterForm />

        <center>
          <button
            type="button"
            className="loginButton"
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </button>
        </center>
      </div>
    </header>
  );
}

export default RegisterPage;
