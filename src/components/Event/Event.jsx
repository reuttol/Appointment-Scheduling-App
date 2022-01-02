import React from "react";
import { useHistory } from "react-router-dom";
import "./event.css";

const Event = ({ event: { instructor, id, name }, event, row, col }) => {
  const history = useHistory();
//   const context = useContext(AppContext);
  //const location = useLocation();   push to history also: prevPath: location.pathname,
  
  return (
    <div
      style={{ gridRow: `${parseInt(row)}`, gridColumn: `${parseInt(col)}` }}
      className={`event ${name.toLowerCase()}`}
      onClick={() =>
        history.push({
          pathname: `/${id}`,
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
