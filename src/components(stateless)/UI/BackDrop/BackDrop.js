import React from "react";
import classes from "./BackDrop.module.css";
const backdrop = (props) => {
  return props.show ? <div className={classes.Backdrop} onClick={props.cancel}></div> : null;
};

export default backdrop;
