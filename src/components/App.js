import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppProvider } from "./Context.js";

import Navbar from "./Navbar/Navbar";
import HomePage from "./HomePage/HomePage";
import EventDetails from "./EventDetails/EventDetails";
import Login from "./Login/Login";

// import api from "../api";
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
            {/* /<Route exact path="/dashboard" component={Dashboard} /> */}
            <Route path="/homepage" exact component={HomePage} />

            <Route path="/events/:id" exact component={EventDetails} />
            
            {/* <Route path="/:id" exact/>
              <EventDetails />
            <Route /> */}
            
            {/* <Route component={NotFound404} /> */}
          </Switch>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
};

export default App;
