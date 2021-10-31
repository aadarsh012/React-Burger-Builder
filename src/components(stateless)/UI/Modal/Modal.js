import React from "react";
import classes from "./Modal.module.css";
import Aux from "../../../HOC/auxilliary";
import BackDrop from "../BackDrop/BackDrop";
const modal = (props) => {
  return (
    <Aux>
      <BackDrop show={props.show} cancel={props.ordercancel} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "scale(90%)" : "scale(100%)",
          zIndex: props.show ? "500" : "-1",
          opacity: props.show ? "1" : "0"
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};
export default modal;
