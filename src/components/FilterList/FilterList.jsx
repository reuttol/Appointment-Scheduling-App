import React, { useEffect, useContext} from "react";
import { AppContext } from "../Context.js";

import Event from "../Event/Event.jsx";

const FilterList = ({events}) => {
  const context = useContext(AppContext);
  const filtersObj = context.filters;

  useEffect(() => {
  }, [context.filters]);

  const filter = (temp) => {

    if(filtersObj.classes.length !==0){
      temp = temp.filter((event) => filtersObj.classes.includes(event.name) );
    }
    if(filtersObj.teachers.length !==0){
      temp = temp.filter((event) => filtersObj.teachers.includes(event.instructor) );
    }
    if(filtersObj.days.length !==0){
      temp = temp.filter((event) => filtersObj.days.includes(event.day) );
    }

    return temp;
   
  };
  return (
    <>
      {filter(events).map((event) => (
        
        <Event
          key={event.id}
          event={event}
          col={context.mobile ? 2 : context.weekDays.indexOf(event.day) + 2}
          row={event.hour - context.startHour + 2}
        />
      ))}
    </>
  );
};

export default FilterList;
