import React, { useEffect, useContext } from "react";
import { AppContext } from "../Context";
import UpcomingCard from "../UpcomingCard/UpcomingCard";

const UpcomingList = () => {
  const context = useContext(AppContext);
  
  useEffect(() => {
    
  }, [context.userData])
  return (
    <>
      {context.userData && context.userData.classes.map((eventID) => {
        const enrolledClass = context.events.find((event) => event.id === eventID);

        return <UpcomingCard key={eventID} event={enrolledClass} />;
      })}
    </>
  );
};

export default UpcomingList;
