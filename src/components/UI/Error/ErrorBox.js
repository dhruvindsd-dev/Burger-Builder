import React from "react";

export default function ErrorBox({ msg }) {
  return (
    <div className="notification is-danger is-light">
      <p className="is-size-5">{msg}</p>
    </div>
  );
}
