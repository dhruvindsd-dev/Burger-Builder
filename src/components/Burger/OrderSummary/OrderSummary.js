import React from "react";

export default function OrderSummary(props) {
  const order = Object.keys(props.ingredients).map((key) => {
    if (!!props.ingredients[key]) {
      return <li key={key}>{key + ": " + props.ingredients[key]} pieces</li>;
    }
  });
  return (
    <React.Fragment>
      <p className="is-size-2 has-text-weight-semibold">Your Order </p>
      <p className="is-size-5">
        A delicious burger with the following ingredients :
      </p>
      <ul>{order}</ul>
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
