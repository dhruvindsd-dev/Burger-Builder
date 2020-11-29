import React from "react";
import Input from "../UI/Input/Input";

export default function DeliveryForm({
  formDetails,
  change,
  confirmOrderClick,
  cancelOrderClick,
  isFormValid,
}) {
  return (
    <div>
      <p className="is-size-3 has-text-weight-semibold mb-3">
        Where should we deliver you delicious burger ?
      </p>
      {Object.keys(formDetails).map((item) => {
        return (
          <Input
            key={item}
            valid={formDetails[item].valid}
            label={item}
            config={formDetails[item].elementConfig}
            value={formDetails[item].value}
            elementType={formDetails[item].elementType}
            touched={formDetails[item].touched}
            change={change.bind(this, item)}
          />
        );
      })}

      <div className="buttons mt-5">
        <button
          disabled={!isFormValid}
          onClick={confirmOrderClick}
          className=" button is-fullwidth is-success is-light is-outlined is-large"
        >
          Confirm Order {isFormValid}
        </button>
        <button
          onClick={cancelOrderClick}
          className=" button is-fullwidth is-danger is-light is-outlined is-large"
        >
          Cancel Order
        </button>
      </div>
    </div>
  );
}
