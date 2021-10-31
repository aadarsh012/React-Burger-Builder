import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Here is your Burgerrr</h1>
      <div style={{ width: "100%", height: "300px", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <div style={{ display: "flex" }}>
        <Button btnType="Danger" clicked={props.cancel}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={props.continue}>
          Continue
        </Button>
      </div>
    </div>
  );
};
export default checkoutSummary;
