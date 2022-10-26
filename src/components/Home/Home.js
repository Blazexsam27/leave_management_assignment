import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home/Home.css";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const access_token = localStorage.getItem("access-token");
    if (access_token) setLoggedIn(true);
    else setLoggedIn(false);
  }, []);

  return (
    <div className="home-container">
      <div className="header">
        LEAVE <span>MANAGEMENT</span>
      </div>
      {loggedIn ? (
        <div className="menu-btns">
          <Link to={"/"}>
            <button>Home</button>
          </Link>
          <Link to={"/listing"}>
            <button>Listing</button>
          </Link>
          <Link to={"/createleave"}>
            <button>Create Leave</button>
          </Link>
        </div>
      ) : (
        <div className="menu-btns">
          <Link to={"/signin"}>
            <button>Sign In</button>
          </Link>
          <Link to={"/signup"}>
            <button>Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
}
