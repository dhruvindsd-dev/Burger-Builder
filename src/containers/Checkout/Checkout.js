import Axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Input from "../../components/UI/Input/Input";
import Loader from "../../components/UI/Loader/Loader";
import * as actionTypes from "../../store/actions/actions";
class Checkout extends Component {
  state = {
    orderForm: {
      Name: {
        elementType: "input",
        value: "",
        touched: false,
        valid: false,
        validation: {
          required: true,
          maxlength: 30,
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
    orderFormIsValid: false,
    isLoading: false,
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
    // adding burgerInfo
    formData.burgerIngredients = this.props.ingredients;
    // adding total price
    formData.totalPrice = this.props.totalPrice;
    // adding delivery Instructions
    formData.deliveryDetials = {};
    Object.keys(this.state.orderForm).map((item) => {
      formData.deliveryDetials[item] = this.state.orderForm[item].value;
    });
    this.setState({ isLoading: true });
    Axios.post(
      "https://recipe-app-ab93d.firebaseio.com/orders.json?auth=" +
        this.props.token,
      formData
    ).then(
      (response) => {
        this.props.resetBurger();
        this.props.history.push("/");
      },
      (error) => {
        this.setState({ isLoading: false });
      }
    );
  };

  render() {
    return (
      <div className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              {this.state.isLoading ? (
                <Loader />
              ) : (
                <div className="column is-7">
                  <p className="is-size-3 has-text-weight-semibold mb-3">
                    Where should we deliver you delicious burger ?
                  </p>
                  {Object.keys(this.state.orderForm).map((item) => {
                    return (
                      <Input
                        key={item}
                        valid={this.state.orderForm[item].valid}
                        label={item}
                        config={this.state.orderForm[item].elementConfig}
                        value={this.state.orderForm[item].value}
                        elementType={this.state.orderForm[item].elementType}
                        touched={this.state.orderForm[item].touched}
                        change={this.inputChangehandler.bind(this, item)}
                      />
                    );
                  })}

                  <div className="buttons mt-5">
                    <button
                      disabled={!this.state.orderFormIsValid}
                      onClick={this.orderHandler}
                      className=" button is-fullwidth is-success is-light is-outlined is-large"
                    >
                      Confirm Order
                    </button>
                    <button
                      // onClick={this.props.}
                      className=" button is-fullwidth is-danger is-light is-outlined is-large"
                      onClick={() => {
                        this.props.history.push("/");
                      }}
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    token: state.auth.authToken,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    resetBurger: () => {
      dispatch({
        type: actionTypes.RESET_BURGER,
      });
    },
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
);
