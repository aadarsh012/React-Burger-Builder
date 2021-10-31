import React from "react";
import classes from "./BurgerIngredient.module.css";
import PropTypes from "prop-types";

const burgerIngredient = (props) => {
  let ingredient = null;
  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className={classes.BreadBottom}></div>;
      break;

    case "bread-top":
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;

    case "meat":
      ingredient = <div className={classes.Meat}></div>;
      break;

    case "salad":
      ingredient = <div className={classes.Salad}></div>;
      break;

    case "cheese":
      ingredient = <div className={classes.Cheese}></div>;
      break;

    case "chicken":
      ingredient = <div className={classes.Chicken}></div>;
      break;

    default:
      ingredient = null;
  }
  return ingredient;
};
burgerIngredient.propType = {
  type: PropTypes.string.isRequired
};

export default burgerIngredient;