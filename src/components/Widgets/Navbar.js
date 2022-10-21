import React from "react";
import { Link } from "react-router-dom";
import "../styles/Widgets/Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav-container">
      <ul>
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <Link to={"/"}>
          <li>Leaves</li>
        </Link>
        <Link to={"/"}>
          <li>About</li>
        </Link>
      </ul>
    </nav>
  );
}
