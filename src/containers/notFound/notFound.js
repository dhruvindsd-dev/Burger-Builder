import React from "react";
import { Link } from "react-router-dom";

const notFound = () => {
  return (
    <div className="hero is-medium is-danger">
      <div
        className="hero-body"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="has-text-centered">
          <p className="title">Not Found</p>
          <Link to="/" className="button is-light is-large">
            CLICK HERE TO GO TO THE HOME PAGE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default notFound;
