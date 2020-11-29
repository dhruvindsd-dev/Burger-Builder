import React from "react";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Meat", value: "meat" },
  { label: "Cheese", value: "cheese" },
  { label: "Salad", value: "salad" },
  { label: "Bacon", value: "bacon" },
];

const BuildControls = (props) => {
  return (
    <React.Fragment>
      <div className="notification has-text-centered is-success is-light">
        <div className="level">
          <div className="level-item">
            <span className="icon is-size-1">
              <i className="fas fa-money-check-alt"></i>
            </span>
          </div>
          <div className="level-item is-size-3">
            <span className="icon is-medium">
              <i className="fas fa-dollar-sign"></i>
            </span>
            <span className="has-text-weight-bold is-size-2">
              {props.totalPrice.toFixed(2)} /-
            </span>
          </div>
        </div>
      </div>
      {controls.map((cntrl, i) => {
        return (
          <BuildControl
            price={props.ingredientsPrice[cntrl.value]}
            control={cntrl}
            key={i}
            moreClick={props.moreClick}
            lessClick={props.lessClick}
            disabledInfo={props.disabledInfo[cntrl.value]}
          />
        );
      })}
      <button
        disabled={!props.purchasable}
        className="button is-large is-success is-fullwidth"
        onClick={props.purchaseClick}
      >
        <span className="icon">
          <i className="fas fa-hamburger"></i>
        </span>
        <span>ORDER NOW</span>
      </button>
    </React.Fragment>
  );
};

export default BuildControls;
