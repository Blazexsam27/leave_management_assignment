import React from "react";
import "./styles/Page404.css";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <>
      <div className="error-container">
        <p className="header">
          404 <span>ERROR</span>
        </p>
        <p className="header">PAGE NOT FOUND</p>
        <Link to={"/"}>
          <div className="home-btn">Home</div>
        </Link>
      </div>
    </>
  );
}
