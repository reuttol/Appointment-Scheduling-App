import React, { createContext, useState, useEffect } from "react";
import api from "../api";
import { data } from "./Data";

export const AppContext = createContext();

//*----------------------------------------------------------------------------------------
//*    Provider
//*----------------------------------------------------------------------------------------
const { Provider } = AppContext;

export const AppProvider = (props) => {
  const [startHour, setStartHour] = useState(6);
  const [events, setEvents] = useState(data);
  const [user, setUser] = useState({id:47374, name: "Reut"});

  useEffect(() => {
    const getData = async () => {
      // const data = await api.getItems();
      // setEvents(data);
    };

    getData();
  }, []);

  const enrollUserToEvent = (event) => {
    const index = events.indexOf(event);
    const temp = [...events];
    temp[index].enrolled.push(user);
    setEvents(temp);
}

const disenrollUserToEvent = (event) => {
    const eventIndex = events.indexOf(event);
    const temp = [...events];
    const userIndex = temp[eventIndex].enrolled.indexOf(user);
    temp[eventIndex].enrolled.splice(userIndex, 1);
    setEvents(temp);
  }




  return (
    <Provider value={{ startHour, setStartHour, events, setEvents, enrollUserToEvent, disenrollUserToEvent, user}}>
      {props.children}
    </Provider>
  );
};
