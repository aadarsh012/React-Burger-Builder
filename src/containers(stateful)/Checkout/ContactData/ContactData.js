import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components(stateless)/UI/Button/Button";
import Spinner from "../../../components(stateless)/UI/Spinner/Spinner";
import Input from "../../../components(stateless)/UI/Input/Input";
import classes from "./ContactData.module.css";
import axios from "../../../axios";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        isValid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: "",
        validation: {
          required: true
        },
        isValid: false,
        touched: false
      },
      pincode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Pin-Code"
        },
        value: "",
        validation: {
          required: true
        },
        isValid: false,
        touched: false
      }
    },
    formIsValid: false,
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    let order = {
      price: this.props.price,
      ingredients: this.props.ingredients,
      customerInfo: formData,
      userId: this.props.userId
    };

    axios
      .post("/order.json?auth=" + this.props.token, order)
      .then((res) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  };

  checkValidity = (value, rules) => {
    let isValid = false;
    if (rules.required) {
      isValid = value.trim() !== "";
    }
    return isValid;
  };

  inputChangedHandler = (event, inputID) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputID] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.isValid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    let formIsValid = true;
    for (let key in updatedOrderForm) {
      formIsValid = updatedOrderForm[key].isValid && formIsValid;
    }

    updatedOrderForm[inputID] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    console.log(this.state.orderForm);
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.isValid}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return <div className={classes.ContactData}>{form}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    userId: state.authReducer.userId
  };
};

export default connect(mapStateToProps, null)(ContactData);
