import React from "react";
import classes from "./Sidedrawer.module.css";
import Aux from "../../../HOC/auxilliary";
import Backdrop from "../../UI/BackDrop/BackDrop";

const sidedrawer = (props) => {
  let classArray = [classes.Sidedrawer, classes.Close];
  if (props.open) {
    classArray = [classes.Sidedrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.open} cancel={props.closed} />
      <div className={classArray.join(" ")}>
        <p>sidedrawer</p>
      </div>
    </Aux>
  );
};
export default sidedrawer;
