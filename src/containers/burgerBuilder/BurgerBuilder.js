import React, { Component } from "react";
import BuildControls from "../../components/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Loader from "../../components/UI/Loader/Loader";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actions";
import Axios from "axios";
import { authenticate } from "../../store/actions/auth";
const INGREDIENTPRICES = {
  meat: 0.5,
  salad: 0.2,
  cheese: 0.6,
  bacon: 0.4,
};

class BurgerBuilder extends Component {
  state = {
    isOrderSummary: false,
    isLoadingBurger: true,
  };
  componentDidMount() {
    // get the initial burger data from the server and also the recipes but before that just save the ingredients on the server
    if (this.props.initialBurger) {
      this.setState({ isLoadingBurger: false });
    }
    if (!this.props.initialBurger) {
      Axios.get("https://recipe-app-ab93d.firebaseio.com/details.json").then(
        (response) => {
          Object.keys(response.data.ingredients).map((item) => {
            for (let i = 0; i < response.data.ingredients[item]; i++) {
              this.props.addIngredientHandler(item);
            }
          });
          // this.props.toggleInitialBurgerLoad();
          this.props.cacheBurger(response.data.ingredients);
          this.setState({ isLoadingBurger: false });
        }
      );
    }
  }

  onOrderClickHandler = () => {
    this.props.history.push("checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = this.props.ingredients[key] <= 0;
    }
    let modal;
    if (this.state.isOrderSummary) {
      modal = (
        <Modal>
          <OrderSummary
            totalPrice={this.props.totalPrice}
            ingredients={this.props.ingredients}
            cancelClick={() => {
              this.setState({ isOrderSummary: false });
            }}
            orderClick={this.onOrderClickHandler}
          />
        </Modal>
      );
    }
    return (
      <div className="columns is-centered section ">
        {modal}
        <div className="column is-4">
          {this.state.isLoadingBurger ? (
            <React.Fragment>
              <Loader />
              <p className="is-size-3">Creating A Delicious Burger For You</p>
            </React.Fragment>
          ) : (
            <Burger ingredients={this.props.ingredients} />
          )}
        </div>
        <div className="column is-1"></div>
        <div className="column is-5">
          <BuildControls
            ingredientsPrice={INGREDIENTPRICES}
            disabledInfo={disabledInfo}
            purchaseClick={() => {
              this.setState({ isOrderSummary: true });
            }}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    isPurchaseable: state.burger.isPurchasable,
    totalPrice: state.burger.totalPrice,
    authState: state.auth.isAuthenticated,
    didInitialLoad: state.burger.didInitialLoad,
    initialBurger: state.cache.initialBurger,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addIngredientHandler: (type) => {
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        payload: { type: type },
      });
    },
    toggleInitialBurgerLoad: () => {
      dispatch({ type: actionTypes.TOGGLE_INITIAL_BURGER_LOAD });
    },
    cacheBurger: (burger) => {
      dispatch({
        type: actionTypes.CACHE_INITIAL_BURGER,
        payload: { burger: burger },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
