import React from "react";
import classes from "./Button.module.css";

const button = (props) => {
  let classArray = [];
  if (props.btnType === "Success") {
    classArray.push(classes.Success);
  }
  if (props.btnType === "Danger") {
    classArray.push(classes.Danger);
  }

  return (
    <button className={classArray} onClick={props.clicked} disabled={props.disabled}>
      {props.children}
    </button>
  );
};
export default button;
