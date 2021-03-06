import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItem.module.css";

const navigationItem = (props) => {
  return (
    <div className={classes.NavigationItem}>
      <NavLink to={props.link} exact={props.exact} activeClassName={classes.active}>
        {props.children}
      </NavLink>
    </div>
  );
};
export default navigationItem;
