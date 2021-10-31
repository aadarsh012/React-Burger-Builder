import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../HOC/auxilliary";
import Burger from "../../components(stateless)/Burger/Burger";
import BuildControls from "../../components(stateless)/Burger/BuildControls/BuildControls";
import Modal from "../../components(stateless)/UI/Modal/Modal";
import axios from "../../axios";
import Spinner from "../../components(stateless)/UI/Spinner/Spinner";
import Button from "../../components(stateless)/UI/Button/Button";
import * as burgerBuilderActions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    order: false,
    orderButton: false,
    loading: false
  };

  orderHandler = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igkey) => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  orderButtonHandler = () => {
    if (this.props.isAuth) {
      this.setState({ orderButton: true });
    } else {
      this.props.onSetRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  orderCancel = () => {
    this.setState({ orderButton: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.props.ings) {
      queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ings[i]));
    }
    queryParams.push("price=" + this.props.price);

    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: queryString
    });
  };

  componentDidMount() {
    console.log(this.props);
    this.props.initIngredients();
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = (
      <div>
        <p>
          <strong>Your Burger</strong>
        </p>
        <Burger ingredients={this.props.ings} />
        <p>
          <strong>Your Total : {this.props.price}</strong>
        </p>
        <div style={{ display: "flex" }}>
          <Button btnType="Danger" clicked={this.orderCancel}>
            Cancel
          </Button>
          <Button btnType="Success" clicked={this.purchaseContinueHandler}>
            Checkout
          </Button>
        </div>
      </div>
    );

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          orderContinue={this.purchaseContinueHandler}
          show={this.state.orderButton}
          ordercancel={this.orderCancel}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.props.ings} />
        <BuildControls
          ordered={this.orderButtonHandler}
          totalPrice={this.props.price}
          add={this.props.onAdding}
          remove={this.props.onRemoving}
          disabled={disabledInfo}
          disable={this.orderHandler(this.props.ings)}
          isAuth={this.props.isAuth}
        />
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ing.ingredients,
    price: state.ing.total,
    isAuth: state.authReducer.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAdding: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onRemoving: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    initIngredients: () => {
      axios
        .get("https://burgerss-fdd19-default-rtdb.firebaseio.com/ingredients.json")
        .then((res) => {
          // console.log(res.data);
          return dispatch(burgerBuilderActions.setIngredients(res.data));
        })
        .catch((err) => console.log(err));
    },
    onSetRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
