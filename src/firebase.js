import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { data } from "./components/Data";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKdG89QqoM_IQHd-8DlIhd77uSpbhM0o4",
  authDomain: "reut-mid-project.firebaseapp.com",
  projectId: "reut-mid-project",
  storageBucket: "reut-mid-project.appspot.com",
  messagingSenderId: "430883293796",
  appId: "1:430883293796:web:8c677c60453dd14b096d71",
  measurementId: "G-W49MKGQ9ST",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const test = async () => {
  console.log("test");
  const batch = db.batch();
  data.forEach((element, i) => {
    const elementRef = db.collection("events").doc(`${element.id}`);
    batch.set(elementRef, element);
  });
  await batch.commit();
};
const getEvents = async (start, end) => {
  console.log(start.format("DD/MM/YYYY"), end.format("DD/MM/YYYY"));
  const query = await db
    .collection("events")
    .where("date", "<=", end.format("DD-MM-YYYY"))
    .where("date", ">=", start.format("DD-MM-YYYY"))
    .get();
  const arr = [];
  query.forEach((doc) => {
    arr.push({ ...doc.data() });
  });
  return arr;
};
const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").doc(user.uid).set({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        classes: [],
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").doc(user.uid).set({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      classes: [],
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  auth.signOut();
};

export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
  test,
  getEvents,
};
