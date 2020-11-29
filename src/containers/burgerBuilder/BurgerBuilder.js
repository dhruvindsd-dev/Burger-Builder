import Axios from "axios";
import React, { Component } from "react";
import BuildControls from "../../components/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Loader from "../../components/UI/Loader/Loader";
import DeliveryForm from "../../components/DeliveryForm/DeliveryForm";

const INGREDIENTPRICES = {
  meat: 0.5,
  salad: 0.2,
  cheese: 0.6,
  bacon: 0.4,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      meat: 0,
      salad: 0,
      cheese: 0,
      bacon: 0,
    },
    orderForm: {
      Name: {
        elementType: "input",
        value: "",
        touched: false,
        valid: false,
        validation: {
          required: true,
          maxlength: 5,
        },
        elementConfig: {
          type: "text",
          placeholder: "Your name ",
        },
      },
      "Contact No": {
        elementType: "input",
        value: "",
        touched: false,
        valid: false,
        validation: {
          required: true,
          maxlength: 20,
        },
        elementConfig: {
          type: "number",
          placeholder: "Your contact number",
        },
      },
      Address: {
        elementType: "textarea",
        value: "",
        touched: false,
        valid: false,
        validation: {
          required: true,
        },
        elementConfig: {
          type: "text",
          placeholder: "Your complete address",
        },
      },
    },
    previousOrder: null,
    totalPrice: 4,
    isPurchaseable: false,
    isOrderSummary: false,
    orderDataLoading: false,
    isDeliveryDetails: false,
    isDeliveryDetailsLoading: false,
    orderFormIsValid: false,
  };

  checkValidity = (rules, value) => {
    let isValid = true;
    if (rules.maxlength) {
      isValid = value.length <= rules.maxlength && isValid;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    console.log(isValid);
    return isValid;
  };
  inputChangehandler = (inputIdentifier, event) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.validation,
      updatedFormElement.value
    );
    updatedFormElement.touched = true;

    let isFormValid = true;
    for (let item in updatedOrderForm) {
      if (!updatedOrderForm[item].valid) {
        console.log(item, this.state.orderForm[item].valid);
        isFormValid = false;
        break;
      }
    }
    this.setState({
      orderForm: updatedOrderForm,
      orderFormIsValid: isFormValid,
    });
  };
  orderHandler = () => {
    // make a object with burger details and delivery information and total price
    const formData = {};
    // addeing burgerInfo
    formData.burgerIngredients = this.state.ingredients;
    // adding total price
    formData.totalPrice = this.state.totalPrice;
    // adding delivery Instructions
    formData.deliveryDetials = {};
    Object.keys(this.state.orderForm).map((item) => {
      formData.deliveryDetials[item] = this.state.orderForm[item].value;
    });
    this.setState({
      isDeliveryDetailsLoading: true,
    });
    Axios.post(
      "https://recipe-app-ab93d.firebaseio.com/burger.json",
      formData
    ).then((response) => {
      this.setState({
        isDeliveryDetailsLoading: false,
      });
      console.log(this.props);
      this.props.history.push("orders");
    });
  };
  updatePurchaseHamdler = () => {
    const ingredients = { ...this.state.ingredients };
    const sum = Object.keys(ingredients)
      .map((item) => {
        return ingredients[item];
      })
      .reduce((sum, next) => {
        return sum + next;
      }, 0);
    this.setState({ isPurchaseable: sum > 0 });
  };
  addIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type]++;
    this.setState(
      {
        ingredients: updatedIngredients,
        totalPrice: this.state.totalPrice + INGREDIENTPRICES[type],
      },
      this.updatePurchaseHamdler
    );
  };
  removeIngredienthandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    if (updatedIngredients[type] === 0) {
      return;
    }
    updatedIngredients[type]--;
    this.setState(
      {
        ingredients: updatedIngredients,
        totalPrice: this.state.totalPrice - INGREDIENTPRICES[type],
      },
      this.updatePurchaseHamdler
    );
  };
  onOrderClickHandler = () => {
    this.setState({
      isOrderSummary: false,
      isDeliveryDetails: true,
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = this.state.ingredients[key] <= 0;
    }
    let modal;
    if (this.state.isOrderSummary) {
      modal = (
        <Modal>
          {this.state.orderDataLoading ? (
            <Loader />
          ) : (
            <OrderSummary
              totalPrice={this.state.totalPrice}
              ingredients={this.state.ingredients}
              cancelClick={() => {
                this.setState({ isOrderSummary: false });
              }}
              orderClick={this.onOrderClickHandler}
            />
          )}
        </Modal>
      );
    } else if (this.state.isDeliveryDetails) {
      modal = (
        <Modal>
          {this.state.isDeliveryDetailsLoading ? (
            <Loader />
          ) : (
            <DeliveryForm
              change={this.inputChangehandler}
              isFormValid={this.state.orderFormIsValid}
              formDetails={this.state.orderForm}
              confirmOrderClick={this.orderHandler}
              cancelOrderClick={() => {
                this.setState({ isDeliveryDetails: false });
              }}
            />
          )}
        </Modal>
      );
    }
    return (
      <React.Fragment>
        {modal}
        <div className="columns">
          <div className="column is-5">
            <Burger ingredients={this.state.ingredients} />
          </div>
          <div className="column">
            <BuildControls
              ingredientsPrice={INGREDIENTPRICES}
              totalPrice={this.state.totalPrice}
              moreClick={this.addIngredientHandler}
              lessClick={this.removeIngredienthandler}
              disabledInfo={disabledInfo}
              purchasable={this.state.isPurchaseable}
              purchaseClick={() => {
                this.setState({ isOrderSummary: !this.state.isOrderSummary });
              }}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
