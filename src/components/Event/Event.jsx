import React from "react";
import { useHistory } from "react-router-dom";
import "./event.css";

const Event = ({ event: { instructor, id, name }, event, row, col }) => {
  const history = useHistory();
//   const context = useContext(AppContext);
  //const location = useLocation();   push to history also: prevPath: location.pathname,
  
  return (
    <div
      style={{ gridRow: `${parseInt(row)} / span 1`, gridColumn: `${parseInt(col)} / span 1` }}
      className={`event ${name.toLowerCase()}`}
      onClick={() =>
        history.push({
          pathname: `/events/${id}`,
          state: {
            event,
          },
        })
      }
    >
      <div>{name}</div>
      <div>{instructor}</div>
    </div>
  );
};

export default Event;
