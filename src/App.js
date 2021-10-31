import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Layout from "./components(stateless)/Layout/layout";
import asyncComponents from "./HOC/asyncComponents";
import BurgerBuilder from "./containers(stateful)/Burger Builder/burgerbuilder";
import Logout from "./containers(stateful)/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

const asyncOrders = asyncComponents(() => {
  return import("./containers(stateful)/Orders/Orders");
});
const asyncCheckout = asyncComponents(() => {
  return import("./containers(stateful)/Checkout/Checkout");
});
const asyncAuth = asyncComponents(() => {
  return import("./containers(stateful)/Auth/Auth");
});

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignUp();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoSignUp: () => dispatch(actions.checkAuthState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
