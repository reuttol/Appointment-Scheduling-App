import React from "react";
import { Link } from "react-router-dom";

import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div>Welcome Back, Reut!</div>
      <Link to="/">Profile</Link>
      <Link to="/">Settings</Link>
      <Link to="/">Log out</Link>
    </nav>
  );
};

export default Navbar;
