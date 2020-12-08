import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="section has-text-centered">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
