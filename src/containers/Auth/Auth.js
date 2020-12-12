import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import ErrorBox from "../../components/UI/Error/ErrorBox";
import Input from "../../components/UI/Input/Input";
import { authenticate } from "../../store/actions/auth";
class Auth extends Component {
  state = {
    isLoading: false,
    orderForm: {
      email: {
        elementType: "input",
        value: "",
        touched: false,
        valid: false,
        validation: {
          required: true,
        },
        elementConfig: {
          type: "email",
          placeholder: "Enter your email address...",
        },
      },
      password: {
        elementType: "input",
        value: "",
        touched: false,
        valid: false,
        validation: {
          required: true,
          minlength: 6,
        },
        elementConfig: {
          type: "password",
          placeholder: "Please enter a password",
        },
      },
    },
    formIsValid: false,
    isSignUp: false,
    errorMsg: "",
    redirect: "",
  };

  checkValidity = (rules, value) => {
    let isValid = true;
    if (rules.maxlength) {
      isValid = value.length <= rules.maxlength && isValid;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minlength) {
      isValid = value.length >= rules.minlength && isValid;
    }
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
        isFormValid = false;
        break;
      }
    }
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: isFormValid,
    });
  };
  onSubmitHandler = () => {
    this.setState({ isLoading: true });
    this.props
      .authenticateUser(
        this.state.isSignUp,
        this.state.orderForm.email.value,
        this.state.orderForm.password.value
      )
      .then(() => {
        this.props.history.push(`/${this.state.redirect}`);
      })
      .catch((error) => {
        console.log("in catch error");
        this.setState({ isLoading: false, errorMsg: error.data.error.message });
      });
  };
  componentDidMount() {
    const redirectParam = new URLSearchParams(this.props.location.search).get(
      "redirect"
    );
    const type = this.props.match.params.type;
    if (type == "signup" && !this.state.isSignUp) {
      this.setState({ isSignUp: true, redirect: redirectParam });
    }
  }
  componentDidUpdate() {
    let type = this.props.match.params.type;
    if (type == "signin" && this.state.isSignUp) {
      this.setState({
        isSignUp: false,
        errorMsg: "",
      });
    }
    if (type == "signup" && !this.state.isSignUp) {
      this.setState({
        isSignUp: true,
        errorMsg: "",
      });
    }
  }
  render() {
    return (
      <div className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-5">
                <p className="has-text-centered has-text-danger">
                  <span className="icon is-size-1">
                    <i className="fas fa-cannabis" />
                  </span>
                </p>
                <p className="has-text-dark is-size-4 has-text-centered has-text-weight-semibold">
                  {this.state.isSignUp ? "Sign-Up" : "Sign-In"}
                </p>
                <br />
                {!!this.state.errorMsg ? (
                  <ErrorBox msg={this.state.errorMsg} />
                ) : null}
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
                <div className="buttons">
                  <button
                    disabled={!this.state.formIsValid}
                    onClick={this.onSubmitHandler}
                    className={
                      "button is-dark is-outlined " +
                      (this.state.isLoading ? "is-loading" : "")
                    }
                  >
                    Submit
                  </button>
                </div>
                {this.state.isSignUp ? (
                  <Link to={`./signin?redirect=${this.state.redirect}`}>
                    Aldready Have A Account ? Click Here To Sign In
                  </Link>
                ) : (
                  <Link to={`./signup?redirect=${this.state.redirect}`}>
                    Dont Have A Account ? Click Here To Sign Up
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: (isSignUp, email, password, route) => {
      return dispatch(authenticate(isSignUp, email, password, route));
    },
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
