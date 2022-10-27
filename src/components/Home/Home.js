import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Home/Home.css";
import Cookies from "js-cookie";
import Alert from "../Widgets/Alert";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const location = useLocation();

  const handleAlertDismiss = () => {
    setVisibleAlert(false);
    window.history.replaceState({}, document.title);
  };

  useEffect(() => {
    if (location.state) setVisibleAlert(true);
    const access_token = Cookies.get("access_token");
    if (access_token) setLoggedIn(true);
    else setLoggedIn(false);
  }, []);

  return (
    <div className="home-container">
      {visibleAlert ? (
        <Alert dismiss={handleAlertDismiss} text={location.state.message} />
      ) : null}
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
          <Link to={"/calendar"}>
            <button>Calendar</button>
          </Link>
          <Link to={"/signout"}>
            <button>Logout</button>
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
