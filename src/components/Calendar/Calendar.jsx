import React from "react";
import "./calendar.css";

const Calendar = () => {
  const daysOfWeek = [
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
    return daysOfWeek.map((day) => <div className="day__header">{day}</div>);
  };
  return (
    <div className="calendar-container">
        <div></div>
      {renderDaysHeader()}
      {renderHoures()}
      <div className="event">Yoga</div>
    </div>
  );
//   return (
//     <div className="calendar-container">
//       <div className="hours-container">
//         <div className="day__header">5</div>
//         <div className="hours__list">{renderHoures()}</div>
//       </div>
//       <Day />
//       <Day />
//       <Day />
//       <Day />
//       <Day />
//       <Day />
//       <Day />
//     </div>
//   );
};

export default Calendar;
