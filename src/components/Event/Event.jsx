import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../Context";
import "./event.css";

const Event = ({ event: { instructor, id, name }, event, row, col }) => {
  const history = useHistory();
  const context = useContext(AppContext);

  return (
    <div
      style={{
        gridRow: `${parseInt(row)} / span 1`,
        gridColumn: `${parseInt(col)} / span 1`,
      }}
      className={`event ${name.toLowerCase()}`}
      onClick={
        context.user &&
        (() =>
          history.push({
            pathname: `/events/${id}`,
            state: {
              event,
            },
          }))
      }
    >
      <div>{name}</div>
      <div>{instructor}</div>
    </div>
  );
};

export default Event;
