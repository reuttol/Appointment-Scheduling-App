import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./Navbar/Navbar";

import api from "../api";
import "./app.css";
import Calendar from "./Calendar/Calendar";
import EventDetails from "./EventDetails";
import { AppProvider } from "./Context.js";

const App = () => {
  useEffect(() => {}, []);

  return (
    <div className="app">
      <AppProvider>
        {/* <Test /> */}
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Calendar} />
            <Route path="/:id" exact component={EventDetails} />
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
