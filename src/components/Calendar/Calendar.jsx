import React, { useContext } from "react";
import { AppContext } from "../Context.js";

import FilterList from "../FilterList/FilterList.jsx";
import "./calendar.css";

const Calendar = () => {
  const context = useContext(AppContext);

  const renderHoures = () => {
    let arr = [];
    for (let i = 6; i < 23; i++) {
      arr.push(
        <div key={i} className="hours__list--hour">
          {i > 12 ? (
            <>
              {`${i - 12}`}
              <span className="hours__list--text">PM</span>
            </>
          ) : (
            <>
              {`${i}`}
              <span className="hours__list--text">AM</span>
            </>
          )}
        </div>
      );
    }
    return arr;
  };

  const renderDaysHeader = () => {
    return context.weekDays.map((day) => (
      <div key={day} className="day__header">
        {day}
      </div>
    ));
  };
  return (
    <div className="calendar-container">
      <div></div>
      {renderDaysHeader()}
      {renderHoures()}
      <FilterList events={context.events}/>
    </div>
  );
};

export default Calendar;
