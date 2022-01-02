import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { AppContext } from "./Context.js";

const EventDetails = () => {
  const history = useHistory();
  const context = useContext(AppContext);
  const eventDetails = history.location.state.event;
  const freeCapacity = eventDetails.capacity - eventDetails.enrolled.length;
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [canEnroll, setCanEnroll] = useState(true);

  useEffect(() => {
    const i = eventDetails.enrolled.indexOf(context.user);
    if (i !== -1) setIsEnrolled(true);
    setCanEnroll( freeCapacity>0);
  }, [isEnrolled]);

  const disenroll = () => {
      setIsEnrolled(false);
      context.disenrollUserToEvent(eventDetails);
  }

  const enroll = () => {
    setIsEnrolled(true);
    context.enrollUserToEvent(eventDetails)
  }
  return (
    <div>
      {JSON.stringify(eventDetails)}

      <div>
          {!canEnroll && <div>Sorry! There is no space left in this class</div>}
          <button onClick={history.goBack}>Back</button>
          { isEnrolled && <button onClick={disenroll}>Disenroll</button>}
          { !isEnrolled && <button onClick={enroll} disabled={!canEnroll}>Enroll</button>}
        </div>
    </div>
  );
};

export default EventDetails;
