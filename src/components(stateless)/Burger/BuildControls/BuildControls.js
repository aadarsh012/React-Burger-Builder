import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <strong>Total Price : {props.totalPrice}</strong>
      <BuildControl addIng={props.add} removeIng={props.remove} disabled={props.disabled} />
      <button onClick={props.ordered} disabled={!props.disable} className={classes.OrderButton}>
        {props.isAuth ? "Order Now" : "SIGNUP TO ORDER"}
      </button>
    </div>
  );
};

export default BuildControls;
