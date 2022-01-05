import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { AppContext } from "../Context";
import "./login.css";

const Login = () => {
  const context = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (context.loading) {
      // maybe trigger a loading screen
      return;
    }
    console.log("login", context.user);
    if (context.user) history.replace("/homepage");
  }, [context.user, context.loading]);

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => signInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div className="links">
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div className="links">
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
};

export default Login;
