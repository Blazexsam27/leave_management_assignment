import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home/Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="header">
        LEAVE <span>MANAGEMENT</span>
      </div>
      <div className="menu-btns">
        <Link to={"/signin"}>
          <button>Sign In</button>
        </Link>
        <Link to={"/signup"}>
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
}
