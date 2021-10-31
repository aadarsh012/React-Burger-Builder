import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../HOC/auxilliary";
import classes from "./layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Sidedrawer from "../Navigation/Sidedrawer/Sidedrawer";
class Layout extends Component {
  state = {
    showDrawer: false
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showDrawer: false });
  };

  sideDrawerOpenHandler = () => {
    this.setState({ showDrawer: true });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          openDrawer={this.sideDrawerOpenHandler}
        />
        <Sidedrawer open={this.state.showDrawer} closed={this.sideDrawerCloseHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.token !== null
  };
};

export default connect(mapStateToProps, null)(Layout);
