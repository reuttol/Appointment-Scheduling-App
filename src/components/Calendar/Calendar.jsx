import React, { useContext } from "react";
import { AppContext } from "../Context.js";
import "./calendar.css";

import Event from "../Event/Event";

const Calendar = () => {
  const context = useContext(AppContext);

  const daysOfWeek = [
    "",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const renderHoures = () => {
    let arr = [];
    for (let i = 6; i < 23; i++) {
      arr.push(
        <div className="hours__list--hour">
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
    return daysOfWeek.map((day) => <div key={day} className="day__header">{day}</div>);
  };
  return (
    <div className="calendar-container">
      {renderDaysHeader()}
      {renderHoures()}
      {context.events.map((event) => (
        <Event
          key={event.id}
          event={event}
          col={daysOfWeek.indexOf(event.day) + 1}
          row={event.hour - context.startHour + 2}
        />
      ))}
    </div>
  );
};

export default Calendar;
