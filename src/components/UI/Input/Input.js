import React from "react";

export default function Input(props) {
  let inputElement = null;
  let invalidClass = "";
  if (!props.valid && props.touched) {
    invalidClass = "is-danger";
  }

  switch (props.elementType) {
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.change}
          value={props.value}
          className={"textarea " + invalidClass}
          {...props.config}
        />
      );
      break;
    default:
      inputElement = (
        <input
          onChange={props.change}
          value={props.value}
          className={"input " + invalidClass}
          {...props.config}
        />
      );
  }
  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <div className="control">{inputElement}</div>
    </div>
  );
}
