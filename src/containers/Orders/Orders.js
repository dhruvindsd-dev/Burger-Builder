import Axios from "axios";
import React, { Component } from "react";
import Loader from "../../components/UI/Loader/Loader";
class Orders extends Component {
  state = {
    isLoading: true,
    previousOrder: null,
  };
  componentDidMount() {
    console.log("copponent moubt");
    Axios.get("https://recipe-app-ab93d.firebaseio.com/burger.json").then(
      (response) => {
        const previousOrder = Object.keys(response.data).map((item) => {
          return response.data[item];
        });
        this.setState({ previousOrder: previousOrder });
      }
    );
  }
  render() {
    let order;
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
                      <a
                        key={i}
                        className="button is-outlined is-dark is-small"
                      >
                        {ing} : {item.burgerIngredients[ing]}
                      </a>
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

export default Orders;
