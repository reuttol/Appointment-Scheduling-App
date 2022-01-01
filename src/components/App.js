import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import Day from './Day/Day'

import api from "../api";
import "./app.css";
import Calendar from "./Calendar/Calendar";

const App = () => {

  useEffect(() => {
    
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Calendar} />
          {/* <Route component={NotFound404} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
