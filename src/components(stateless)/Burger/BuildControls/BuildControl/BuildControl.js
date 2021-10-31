import React from "react";
import classes from "./BuildControl.module.css";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Chicken", type: "chicken" }
];

const BuildControl = (props) => {
  return controls.map((ctrl) => {
    return (
      <div className={classes.BuildControl}>
        <p className={classes.Label}>{ctrl.label} : </p>
        <button className={classes.Add} onClick={() => props.addIng(ctrl.type)}>
          Add
        </button>
        <button
          className={classes.Remove}
          onClick={() => props.removeIng(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        >
          Remove
        </button>
      </div>
    );
  });
};
export default BuildControl;
