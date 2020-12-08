import React from "react";

const BuildControl = (props) => {
  return (
    <div
      className="notification"
      // style={{ boxShadow: "2px 2px grey", border: "1px solid grey" }}
    >
      <div className="level is-mobile">
        <div className="level-item">
          <p className="is-size-4 has-text-weight-semibold">
            {props.control.label}
            <span style={{ opacity: "0.7" }} className="is-size-5 ml-3">
              ( ${props.price} )
            </span>
          </p>
        </div>
        <div className="level-item">
          <div className="buttons">
            <button
              className="button is-danger is-light is-outlined"
              onClick={props.lessClick.bind(this, props.control.value)}
              disabled={props.disabledInfo}
            >
              <span className="icon">
                <i className="fas fa-minus"></i>
              </span>
            </button>
            <button
              className="button is-success is-light is-outlined"
              onClick={props.moreClick.bind(this, props.control.value)}
            >
              <span className="icon">
                <i className="fas fa-plus"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildControl;
