import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  //letting a user see their password if they toggle visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <div className="radio_button">
          <input
            type="checkbox"
            className="show-password-button"
            onChange={togglePasswordVisibility}
          />{" "}
          Show Password
        </div>
      </div>
      <div>
        <input
          className="loginButton"
          type="submit"
          name="submit"
          value="Log In"
        />
      </div>
    </form>
  );
}

export default LoginForm;
