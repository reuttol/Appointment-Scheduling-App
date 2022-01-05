import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppProvider } from "./Context.js";

import Navbar from "./Navbar/Navbar";
import Login from "./Login/Login";
import Register from "./Register/Register.jsx";
import HomePage from "./HomePage/HomePage";
import EventDetails from "./EventDetails/EventDetails";
import NotFound404 from "./NotFound404/NotFound404.js";

import "./app.css";

const App = () => {
  useEffect(() => {}, []);

  return (
    <div className="app">
      <AppProvider>
        {/* <Test /> */}
        <BrowserRouter>
          <Navbar />
          <Switch>   
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/" exact component={HomePage} />
            <Route path="/events/:id" exact component={EventDetails} />
            <Route component={NotFound404} />
          </Switch>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
};

export default App;
