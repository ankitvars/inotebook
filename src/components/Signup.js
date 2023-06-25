/* eslint-disable no-lone-blocks */
import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const host = "http://localhost:7000";
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      showAlert("Account created successfully!", "success");
    } else {
      {
        json.error
          ? showAlert(json.error, "danger")
          : showAlert(json.errors[0].msg, "warning");
      }
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <form style={{ border: "1px solid #ccc" }}>
      <div className="container">
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />
        <label htmlFor="name">
          <b>Name</b>
        </label>
        <input
          className="inp"
          type="text"
          placeholder="Name"
          name="name"
          onChange={onChange}
          required
        />

        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          className="inp"
          type="text"
          placeholder="Enter Email"
          name="email"
          onChange={onChange}
          required
        />

        <label htmlFor="password">
          <b>Password</b>
        </label>
        <input
          className="inp"
          type="password"
          placeholder="Enter Password"
          name="password"
          onChange={onChange}
          required
        />

        <label>
          <input
            type="checkbox"
            name="remember"
            style={{ marginBottom: "15px" }}
          />{" "}
          Remember me
        </label>

        <p>
          By creating an account you agree to our{" "}
          <a
            href="file:///media/fuse/drivefs-525daa482b0b219dcaeee7cc8e7ecf57/root/loging.html"
            style={{ color: "dodgerblue" }}
          >
            Terms & Privacy
          </a>
          .
        </p>

        <div className="clearfix">
          <button type="submit" className="signupbtn" onClick={handleSignup}>
            Sign Up
          </button>
          <button type="button" className="cancelbtn ">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default Signup;
