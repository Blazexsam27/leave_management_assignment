import React, { useState } from "react";
import "../styles/Auth/SignUp.css";
import signup from "../../assets/images/sign_up.png";
import { saveTokens } from "../../services/authServices";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    if (/\S+@\S+\.\S+/.test(e.target.value)) {
      setErrors({ email: null, password: null });
    } else setErrors({ email: "Invalid Email", password: null });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    if (e.target.value.length > 5) setErrors({ email: null, password: null });
    else
      setErrors({
        email: null,
        password: "Password must be atleast 6 characters long",
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(email);
    console.log(password);
    if (!errors) alert("Form Has Errors");
    else {
      fetch("https://dkgicggupnrxldwvkeft.supabase.co/auth/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZ2ljZ2d1cG5yeGxkd3ZrZWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYwMDI4ODMsImV4cCI6MTk4MTU3ODg4M30.BLLinQ9VEK8_T-JE22WOidlJs_0TFhOb1n3zkSVc7eg",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          data: {
            name: name,
          },
        }),
      }).then((response) => {
        response.json().then((result) => saveTokens(result));
      });
    }
  };

  return (
    <div className="signup-container">
      <div className="header">
        <p>
          LEAVE <span>MANAGEMENT</span>
        </p>
      </div>
      <div className="auth-form-container">
        <p className="header">Sign Up</p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <img className="signup-image" src={signup} alt="Sign Up Image" />
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            value={name}
            onChange={handleNameChange}
            required
          />
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            name="email"
            autoComplete="off"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <span style={{ color: "red" }}>{errors["email"]}</span>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <span style={{ color: "red" }}>{errors["password"]}</span>
          <button className="submit-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
