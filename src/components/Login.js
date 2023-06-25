import React, { useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const host = "http://localhost:7000";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      showAlert("You are successfully logged in!", "success");
    } else {
      showAlert("Invalid credentials", "danger");
    }
    console.log(json);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-div">
      <h1 className="login-title">Login Page </h1>
      <form className="login-form p-1 m-2" onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control my-1"
            id="password"
            value={credentials.password}
            name="password"
            placeholder="Password"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="buttn btn--form">
          Sign in
        </button>
        <p>
          Don't have account?{" "}
          <Link to="/signup" style={{ textDecoration: "none" }}>
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
