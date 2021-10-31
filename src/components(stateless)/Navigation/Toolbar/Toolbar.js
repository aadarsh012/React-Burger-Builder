import React from "react";
import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div onClick={props.openDrawer}>MENU</div>
      <div>LOGO</div>
      <nav>
        <NavigationItems isAuth={props.isAuthenticated} />
      </nav>
    </header>
  );
};

export default toolbar;
