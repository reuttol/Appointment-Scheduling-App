import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { AppContext } from "../Context.js";

import moment from "moment";
import './eventDetails.css'
const EventDetails = () => {
  const history = useHistory();
  const context = useContext(AppContext);
  const eventDetails = history.location.state.event;
  const freeCapacity = eventDetails.capacity - eventDetails.enrolled.length;
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [canEnroll, setCanEnroll] = useState(true);

  useEffect(() => {
    console.log("ths user:",context.userData);
    console.log("the event", eventDetails);
    console.log(eventDetails.enrolled);
    const i = eventDetails.enrolled.findIndex(id=> id=== context.userData.uid);
    console.log(i);
    if (i !== -1) setIsEnrolled(true);
    setCanEnroll(freeCapacity > 0);
  }, [isEnrolled, freeCapacity]);

  const disenroll = () => {
    setIsEnrolled(false);
    context.disenrollUserToEvent(eventDetails);
  };

  const enroll = () => {
    setIsEnrolled(true);
    context.enrollUserToEvent(eventDetails);
  };

  const getDate = () => {
    const dateArr = eventDetails.date.split('-').reverse().join('');
    const day = eventDetails.day;
    return `${day}, ${moment(dateArr, "YYYYMMDD").format('LL')}`
  }

  const getHour = () => {
    const hour = parseInt(eventDetails.hour);

    return `${hour}:00 - ${hour+1}:00`
  }

  const slots = () =>{
    let notice = "";
    if(freeCapacity>0)
      notice = `Slots open for registration: ${freeCapacity}`;
    else
      notice = "Sorry! There are no sots oppen for this class"

    return notice;
  }
  return (
    <div className="details-page-container">
    <div className="details-container">    
      <div>{eventDetails.name}</div>
      <div>Instructor: {eventDetails.instructor}</div>
      <div><i className="fal fa-calendar-alt"></i>{getDate()}</div>
      <div><i className="fas fa-clock"></i>{getHour()}</div>
      <div><i classNames="fal fa-map-pin"></i>{`Studio #${eventDetails.hall}`}</div>
      <div>{slots()}</div>
      <div id="details-btns-container"> 
        <button className="details-btn" onClick={history.goBack}>Back</button>
        {isEnrolled && (
          <button className="details-btn" onClick={disenroll} >
            Disenroll
          </button>
        )}
        {!isEnrolled && (
          <button className="details-btn" onClick={enroll} disabled={!canEnroll || !context.userData}>
            Enroll
          </button>
        )}
      </div>
    </div>
    </div>
  );
};

export default EventDetails;