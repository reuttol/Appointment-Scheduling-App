import React from "react";
import moment from "moment";
import "./upcomingCard.css";

const UpcomingCard = ({ event }) => {
  const getHour = () => {
    const hour = parseInt(event.hour);

    return `${hour}:00 - ${hour + 1}:00`;
  };

  const getDate = () => {
    const dateArr = event.date.split("-").reverse().join("");
    const day = event.day;
    return `${day}, ${moment(dateArr, "YYYYMMDD").format("ll")}`;
  };

  return (
    <>
      {event && (
        <div className={`upcoming-card ${event?.name.toLowerCase()}`}>
          <>
            <div className="upcoming-card__name">{event.name}</div>
            <div>{`${getHour()}`}</div>
            <div>{`${getDate()}`}</div>
            <div>{event.instructor}</div>
          </>
        </div>
      )}
    </>
  );
};

export default UpcomingCard;
