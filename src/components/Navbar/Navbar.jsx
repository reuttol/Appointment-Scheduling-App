import React, { useContext } from "react";
import { Link, useHistory} from "react-router-dom";
import { AppContext } from "../Context";
import { logout, signInWithGoogle } from "../../firebase";
import "./navbar.css";

const Navbar = () => {
  const context = useContext(AppContext);
  const history = useHistory()
  const handleLogout = () => {
  
    logout();
    history.push('/login');
  }
  return (
    <>
      {!context.userData && (
        <nav className="navbar-container">
          <Link to="/register">Sign Up</Link>
          <Link  onClick={signInWithGoogle} to="/login">Sign In</Link>
        </nav>
      )}
      {context.userData && (
        <nav className="navbar-container">
          <div>{`Welcome Back, ${context.userData.name.split(" ")[0]}`}</div>
          <Link to="/login">Profile</Link>
          <Link to="/login">Settings</Link>
          <a href="" onClick={handleLogout}>Sign out</a>
        </nav>
      )}
    </>
  );
};

export default Navbar;
