import React from "react";

export default function Order(props) {
  return (
    <div className="notification is-link is-light blue-hover">
      <p className="is-size-4 mb-4 has-text-weight-bold">Ingredients :</p>
      <div className="buttons">
        {Object.keys(props.ingredients).map((item, i) => {
          return (
            <div className="button is-link is-outlined is-light" key={i}>
              {item + ": " + props.ingredients[item]}
            </div>
          );
        })}
      </div>
      <p className="is-size-5">Total Price : {props.totalPrice}</p>
    </div>
  );
}
