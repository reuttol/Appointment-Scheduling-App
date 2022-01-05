import React, { useContext } from "react";
import FilterList from "../FilterList/FilterList";
import "./mobileCalendar.css";
import { AppContext } from "../Context";

const MobileCalendar = ({ day }) => {
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

  const filterEvents = () => {
    const t = context.events.filter((event) => event.day === day);
    return t;
  };

  return (
    <div className="mobile-calendar-container">
      <div></div>
      <div className="day__header">{day}</div>
      {renderHoures()}
      <FilterList events={filterEvents()} />
    </div>
  );
};

export default MobileCalendar;
