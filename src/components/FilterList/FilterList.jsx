import React, { useState, useEffect, useContext} from "react";
import { AppContext } from "../Context.js";

import Event from "../Event/Event.jsx";

const FilterList = ({events}) => {
  const context = useContext(AppContext);
  const [filtered, setFiltered] = useState(events);
  const filtersObj = context.filters;

  useEffect(() => {
    console.log("use effect filter list");
    filter();

    console.log("use effect filter list  2");
  }, [context.filters, filtered]);

  const filter = () => {
    console.log("filter in filter list");
    let temp = events;

    if(filtersObj.classes.length !==0){
      temp = temp.filter((event) => filtersObj.classes.includes(event.name) );
    }
    if(filtersObj.teachers.length !==0){
      temp = temp.filter((event) => filtersObj.teachers.includes(event.instructor) );
    }
    if(filtersObj.days.length !==0){
      temp = temp.filter((event) => filtersObj.days.includes(event.day) );
    }

    setFiltered(temp);
   
  };
  return (
    <>
    {console.log(filtered)}
      {filtered.map((event) => (
        
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
