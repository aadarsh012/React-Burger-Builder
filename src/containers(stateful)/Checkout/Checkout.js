import React, { Component } from "react";
import CheckoutSummary from "../../components(stateless)/Orders/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

class Checkout extends Component {
  state = {
    ingredients: {},
    price: 0
  };

  componentDidMount() {
    console.log("checkout", this.props);
    const query = new URLSearchParams(this.props.location.search);

    // let ingredient = {};
    // for (let param in query.entries()) {
    //   console.log("params", param);
    //   // each entry in query will  be ['salad','1'] like this.
    //   ingredient[param[0]] = +param[1];
    // }
    // console.log("new ingredient", ingredient);
    this.setState({
      ingredients: this.props.ingredients,
      price: this.props.price
    });
    console.log("ingredients", this.state.ingredients);
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancel={this.checkoutCancelHandler}
          continue={this.checkoutContinueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapStatesToProps = (state) => {
  return {
    ingredients: state.ing.ingredients,
    price: state.ing.total
  };
};

export default connect(mapStatesToProps, null)(Checkout);
