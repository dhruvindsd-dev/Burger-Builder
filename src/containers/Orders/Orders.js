import Axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "../../components/UI/Loader/Loader";
import { CACHE_ORDERS } from "../../store/actions/actions";
class Orders extends Component {
  state = {
    isLoading: true,
    previousOrder: null,
  };
  fetchOrders = () => {
    return Axios.get(
      `https://recipe-app-ab93d.firebaseio.com/orders/${this.props.userId}.json?auth=${this.props.authToken}`
    );
  };
  handleCacheAndStare = (data) => {
    if (data) {
      const previousOrder = Object.keys(data).map((item) => {
        return data[item];
      });
      this.setState({ previousOrder: previousOrder, isLoading: false });
      this.props.cacheOrders(previousOrder);
    } else {
      this.setState({
        isLoading: false,
      });
    }
  };
  componentDidMount() {
    // first request show loader and fetch
    // second request dont show loader, instead load from cache and check for changes, if any changes only then update... (better ux )
    if (!this.props.orders) {
      this.fetchOrders().then((response) => {
        this.handleCacheAndStare(response.data);
      });
    } else {
      this.setState({
        previousOrder: this.props.orders,
        isLoading: false,
      });
      this.fetchOrders().then((response) => {
        this.handleCacheAndStare(response.data);
      });
    }
  }
  render() {
    let order;
    if (!this.state.isLoading) {
      if (this.state.previousOrder) {
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
        // there is no previous order
        order = (
          <p className="section has-text-centered has-text-danger title">
            <span>You have not ordered any delicious butger till date</span>
            <span className="icon m-3">
              <i className="fas fa-sad-tear"></i>
            </span>
          </p>
        );
      }
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
    userId: state.auth.userId,
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
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
