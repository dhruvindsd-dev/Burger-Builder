import Axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Loader from "../../components/UI/Loader/Loader";
import { CACHE_ORDERS } from "../../store/actions/actions";
class Orders extends Component {
  state = {
    isLoading: true,
    previousOrder: null,
  };
  componentDidMount() {
    if (!this.props.orders) {
      Axios.get(
        "https://recipe-app-ab93d.firebaseio.com/orders.json?auth=" +
          this.props.authToken
      ).then((response) => {
        const previousOrder = Object.keys(response.data).map((item) => {
          return response.data[item];
        });
        this.setState({ previousOrder: previousOrder, isLoading: false });
        this.props.cacheOrders(previousOrder);
      });
    } else {
      this.setState({
        previousOrder: this.props.orders,
        isLoading: false,
      });
    }
  }
  render() {
    let order;
    if (this.state.previousOrder) {
      console.log("this is cache", this.state.previousOrder);
      order = this.state.previousOrder.map((item, index) => {
        return (
          <div key={index} className="column is-3">
            <div className="notification blue-hover">
              <p className="is-size-4 has-text-weight-bold">
                Total Price {item.totalPrice.toFixed(2)}
              </p>
              <div className="is-size-4">
                Ingredients :
                <div className="buttons mt-2">
                  {Object.keys(item.burgerIngredients).map((ing, i) => {
                    return !!item.burgerIngredients[ing] ? (
                      <button
                        key={i}
                        className="button is-outlined is-dark is-small"
                      >
                        {ing} : {item.burgerIngredients[ing]}
                      </button>
                    ) : null;
                  })}
                </div>
              </div>
              <div className="mt-3">
                {Object.keys(item.deliveryDetials).map((deliveryDtail, i) => {
                  return (
                    <p key={i}>
                      {deliveryDtail} : {item.deliveryDetials[deliveryDtail]}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        );
      });
    } else {
      order = <Loader></Loader>;
    }
    return (
      <div className="section">
        <p className="title has-text-dark">Your Orders </p>
        <div className="columns is-multiline">{order}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authToken: state.auth.authToken,
    orders: state.cache.orders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    cacheOrders: (orderData) => {
      dispatch({
        type: CACHE_ORDERS,
        payload: { orders: orderData },
      });
    },
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders));
