import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [is_male, setIs_male] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
        is_male: is_male,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
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
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <div className="checkboxes">
          <div>
            <input
              required
              type="radio"
              name="gender"
              value="male"
              checked={is_male === true}
              onChange={() => setIs_male(true)}
            />
            Male
          </div>{" "}
          <div>
            <input
              required
              type="radio"
              name="gender"
              value="female"
              checked={is_male === false}
              onChange={() => setIs_male(false)}
            />
            Female
          </div>
        </div>
      </div>
      <input type="checkbox" onChange={togglePasswordVisibility} /> Show
      Password
      <div>
        <input
          className="loginButton"
          type="submit"
          name="submit"
          value="Register"
        />
      </div>
    </form>
  );
}

export default RegisterForm;
