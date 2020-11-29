import React from "react";

function Modal(props) {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content animate__animated  animate__jackInTheBox">
        <div className="notification">{props.children}</div>
      </div>
    </div>
  );
}
// animate__rollOut
export default React.memo(Modal);
