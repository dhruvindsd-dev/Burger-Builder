import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BuildControl from "./BuildControl/BuildControl";
import * as actionTypes from "../../store/actions/actions";

const controls = [
  { label: "Meat", value: "meat" },
  { label: "Cheese", value: "cheese" },
  { label: "Salad", value: "salad" },
  { label: "Bacon", value: "bacon" },
];

const BuildControls = (props) => {
  let button;
  if (props.auth) {
    button = (
      <button
        disabled={!props.purchasable}
        className="button is-large is-success is-fullwidth"
        onClick={props.purchaseClick}
      >
        <span className="icon">
          <i className="fas fa-shipping-fast"></i>
        </span>
        <span>ORDER NOW</span>
      </button>
    );
  } else {
    button = (
      <Link
        to="/user/signup"
        className="button is-large is-success is-fullwidth"
      >
        <span className="icon">
          <i className="fas fa-sign-in-alt"></i>
        </span>
        <span>Sign Up Before Ordering</span>
      </Link>
    );
  }
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
      {button}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    purchasable: state.burger.isPurchasable,
    totalPrice: state.burger.totalPrice,
    auth: state.auth.isAuthenticated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    moreClick: (type) => {
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        payload: { type: type },
      });
    },
    lessClick: (type) => {
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        payload: { type: type },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildControls);
