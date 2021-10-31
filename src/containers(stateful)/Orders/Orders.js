import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../../components(stateless)/Order/Order";
import axios from "../../axios";

class Orders extends Component {
  state = {
    loading: true,
    orders: []
  };
  // + '&orderBy="userId"&equalTo="' + this.props.userId + '"'
  componentDidMount() {
    axios
      .get(
        `/order.json?auth=${localStorage.getItem(
          "token"
        )}&orderBy="userId"&equalTo="${localStorage.getItem("userId")}"`
      )
      .then((res) => {
        console.log("order.js", res.data);
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        this.setState({ orders: fetchedOrders, loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order) => (
          <Order ingredients={order.ingredients} total={order.price} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    userId: state.authReducer.userId
  };
};

export default connect(mapStateToProps, null)(Orders);
