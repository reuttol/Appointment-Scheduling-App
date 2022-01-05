import ChromeDinoGame from "react-chrome-dino";
import React from "react";
import "./notFound404.css";
const NotFound404 = () => {
  return (
    <>
      <div className="not-found-container">
        <h1>
          <span id="err-no">404</span> Page Not Found!
        </h1>
        <h2>There is nothing here to see!</h2>
        <h2>But you can play for a while...</h2>
      </div>
      <ChromeDinoGame />
    </>
  );
};
export default NotFound404;
