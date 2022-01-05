import React, { useContext, useState, useEffect } from "react";
import Calendar from "../Calendar/Calendar";
import { AppContext } from "../Context.js";
import moment from 'moment'

import FilterTab from "../FilterTab/FilterTab";
import UpcomingList from "../UpcomingList/UpcomingList";

import './homepage.css'
import MobileCalendar from "../MobileCalendar/MobileCalendar";

const HomePage = () => {
  const context = useContext(AppContext);
  const step = context.mobile ? 1 : 7;
  const [offset, setOffset] = useState(0)
  const [day, setDay] = useState(moment())
  // const [eventData,setEventData ] = useState(0)

  useEffect(() => {
    console.log("offset", "step", offset, step);
    const date = moment().add(offset, 'days');
    console.log("date", date);
    setDay(date)
    const start = date.clone().startOf("week");
    const end = date.clone().endOf("week");
    context.setEndWeek(end);
    context.setStartWeek(start);
  }, [offset]);

  const getRange = () => {
    return `${context.startWeek.format("DD/MM")}-${context.endWeek.format("DD/MM")}`;
  }
  const getDate = () =>{
    return context.mobile ? day.format("DD/MM") : context.startWeek && getRange();

  }

  const handleClick = () => {
    if(offset > 0)
      setOffset(offset => offset - step);
  }
  const add = () => {
    setOffset(offset=> offset+step)
  }
  return (
    <div className="h">
      <div className="main-container">
        <div className="date-container">
          <button className="icon-btn" onClick={handleClick}><i className="fas fa-chevron-left"></i></button>
          <div>{getDate()}</div>
          <button className="icon-btn" onClick={add}><i className="fas fa-chevron-right"></i></button>
        </div>

        <div className="cc">
          {!context.mobile && <Calendar />}
          {context.mobile && <MobileCalendar day={day.format('dddd')}/>}
        </div>
      </div >
      <div className="searchBar-container">
        <div className="tabs-container">
          <button
            className={`tab-btn ${context.active === 1 && "active-btn"}`}
            onClick={() => context.setActive(1)}
          >
            My Events
          </button>
          <button
            className={`tab-btn ${context.active === 2 && "active-btn"}`}
            onClick={() => context.setActive(2)}
          >
            Filters
          </button>
        </div>
        <div className="tab">
          {context.active === 1 && <UpcomingList />}
          {context.active === 2 && <FilterTab />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
