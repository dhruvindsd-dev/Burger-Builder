import React from "react";
import Burger from "../Burger";

export default function OrderSummary(props) {
  // const order = Object.keys(props.ingredients).map((key) => {
  //   if (!!props.ingredients[key]) {
  //     return <li key={key}>{key + ": " + props.ingredients[key]} pieces</li>;
  //   }
  // });
  return (
    <React.Fragment>
      <p className="is-size-2 has-text-weight-semibold">Your Order </p>
      <p className="is-size-5">
        A delicious burger with the following ingredients :
      </p>
      <div className="buttons mt-2">
        {Object.keys(props.ingredients).map((ing, i) => {
          return !!props.ingredients[ing] ? (
            <button
              key={i}
              className="button is-rounded is-outlined is-dark is-small"
            >
              {ing} : {props.ingredients[ing]}
            </button>
          ) : null;
        })}
      </div>
      <div
        className="section m-5 p-5 "
        style={{ height: "40vh", overflowY: "scroll" }}
      >
        <Burger ingredients={props.ingredients} />
      </div>
      {/* <ul>{order}</ul> */}

      <p className="is-size-4 has-text-success">
        Total : <strong>${props.totalPrice.toFixed(2)} /-</strong>
      </p>
      <br />
      <div className="buttons">
        <button
          onClick={props.orderClick}
          className="button  is-medium is-link is-light is-outlined"
        >
          <span className="icon">
            <i className="fas fa-shopping-cart"></i>
          </span>
          <span>CheckOut</span>
        </button>
        <button
          className="button is-medium is-danger is-light is-outlined"
          onClick={props.cancelClick}
        >
          <span className="icon">
            <i className="fas fa-times"></i>
          </span>
          <span>Cancel</span>
        </button>
      </div>
    </React.Fragment>
  );
}
