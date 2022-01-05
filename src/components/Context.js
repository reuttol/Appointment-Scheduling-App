import React, { createContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth, test, getEvents } from "../firebase";
import { useMediaQuery } from 'react-responsive';
import moment from "moment";

export const AppContext = createContext();

//*----------------------------------------------------------------------------------------
//*    Provider
//*----------------------------------------------------------------------------------------
const { Provider } = AppContext;

export const AppProvider = (props) => {
  const [startHour, setStartHour] = useState(6);
  const [events, setEvents] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const [active, setActive] = useState(1);
  const [userData, setUserData] = useState(null);
  const [mobile, SetMobile] = useState(useMediaQuery({ query: `(max-width: 600px)` }));
  const [startWeek, setStartWeek] = useState(moment().clone().add(7, 'days').startOf("week"));
  const [endWeek, setEndWeek] = useState(moment().clone().add(7, 'days').endOf("week"));
  const [classes, setClasses] = useState(["Yoga", "Pilates", "Kickboxing"]);
  const [teachers, setTeachers] = useState([
    "Jane Doe",
    "Jasmine Smith",
    "Jonny Smith",
    "James Doe",
  ]);
  const [filters, setFilters] = useState({
    classes: [],
    teachers: [],
    open: [],
    days: [],
  });
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const getUserData = async () => {
      // !user && (await test());
      let now = moment();
      if (startWeek > now) 
        now = startWeek;
      const tempData = await getEvents(now, endWeek);
      console.log(tempData);
      setEvents(tempData);
      
      if (user) fetchUser();
      else {
        setUserData(null);
      }
    };
    console.log("context use effect");
    console.dir(user);
    console.log(userData);
    getUserData();
    // console.log(user);
    // console.log(userData);
  }, [user, startWeek]);

  const fetchUser = async () => {
    console.log("fetching user...");
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
      console.log("after fetch", data);
      setUserData(data);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
 
  const enrollUserToEvent = async (event) => {
    console.log(event);
    const index = events.indexOf(event);
    console.log(index);
    const temp = [...events];
    console.log(temp[index].enrolled);
    temp[index].enrolled.push(userData.uid);
    console.log(temp[index].enrolled);
    setEvents(temp);
    console.log(temp);
    db.collection("users")
      .doc(`${userData.uid}`)
      .update({
        classes: [...userData.classes, event.id],
      });

    console.log("115", event);
    db.collection("events")
      .doc(`${event.id}`)
      .update({
        enrolled: [...event.enrolled],
      });
  };

  const disenrollUserToEvent = (event) => {
    const eventIndex = events.indexOf(event);
    console.log("eventindex", eventIndex);
    const temp = [...events];
    const userIndex = temp[eventIndex].enrolled.indexOf(userData.uid);
    console.log("disenroll", userIndex);
    temp[eventIndex].enrolled.splice(userIndex, 1);
    setEvents(temp);

    db.collection("users")
      .doc(`${userData.uid}`)
      .update({
        classes: [...temp[eventIndex].enrolled],
      });
    console.log("146", event);
    db.collection("events")
      .doc(`${event.id}`)
      .update({
        enrolled: [...event.enrolled],
      });
  };

  return (
    <Provider
      value={{
        active,
        setActive,
        startHour,
        setStartHour,
        events,
        setEvents,
        enrollUserToEvent,
        disenrollUserToEvent,
        userData,
        setUserData,
        teachers,
        classes,
        filters,
        setFilters,
        weekDays,
        setEndWeek,
        setStartWeek,
        startWeek,
        endWeek,
        user,
        loading,
        mobile
      }}
    >
      {props.children}
    </Provider>
  );
};
