import React from "react";

export default function Display(props) {
  return (
    <div className="display">
      <div className="result">{props.val}</div>
    </div>
  );
}
