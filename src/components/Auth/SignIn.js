import React, { useState, useEffect } from "react";
import "../styles/Auth/SignIn.css";
import signin from "../../assets/images/sign_in.png";
import { saveTokens } from "../../services/authServices";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    if (/\S+@\S+\.\S+/.test(e.target.value))
      setErrors({ email: null, password: null });
    else setErrors({ email: "Invalid Email", password: null });
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
    if (!errors) alert("Form Has Errors!");
    else {
      fetch(
        "https://dkgicggupnrxldwvkeft.supabase.co/auth/v1/token?grant_type=password",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZ2ljZ2d1cG5yeGxkd3ZrZWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYwMDI4ODMsImV4cCI6MTk4MTU3ODg4M30.BLLinQ9VEK8_T-JE22WOidlJs_0TFhOb1n3zkSVc7eg",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      ).then((response) => {
        response.json().then((result) => {
          saveTokens(result);
        });
      });
    }
  };

  useEffect(() => {
    // if (localStorage.getItem("access-token")) navigate("/");
  }, [localStorage.getItem("access-token")]);

  return (
    <div className="signin-container">
      <div className="header">
        <p>
          LEAVE <span>MANAGEMENT</span>
        </p>
        <div className="menu">
          <Link to={"/"}>Home</Link>
        </div>
      </div>
      <div className="auth-form-container">
        <p className="signin-header">Sign In</p>
        <form className="signin-form" onSubmit={handleSubmit}>
          <img className="signin-image" src={signin} alt="Sign In Image" />
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
          <button className="submit-button" type="submit">
            Sign In
          </button>
          <Link to={"/signup"} className="create-account-btn">
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}
