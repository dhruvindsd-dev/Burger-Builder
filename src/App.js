import "./App.css";
import "../node_modules/bulma/css/bulma.css";
import "../node_modules/animate.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import React, { Component, lazy, Suspense } from "react";
import BurgerBuilder from "./containers/burgerBuilder/BurgerBuilder";
import Navbar from "./components/Navbar/Navbar";
import { Route, Switch } from "react-router";
import { connect } from "react-redux";
import { authenticate } from "./store/actions/auth";
import Loader from "./components/UI/Loader/Loader";
import { AUTHENTICATE } from "./store/actions/actions";
import notFound from "./containers/notFound/notFound";

const Checkout = lazy(() => import("./containers/Checkout/Checkout"));
const Auth = lazy(() => import("./containers/Auth/Auth"));
const Orders = lazy(() => import("./containers/Orders/Orders"));
// const Menu = lazy(() =>
//   import("./containers/Menu/Menu")
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((err) => {
//       console.log("there is a fking error mother fucxker ", err);
//     })
// );
const Menu = lazy(() => import("./containers/Menu/Menu"));
class App extends Component {
  state = {
    isLoading: true,
  };
  componentDidMount() {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (email && password) {
      this.props
        .autoLogin(email, password)
        .then(() => {
          this.setState({
            isLoading: false,
          });
        })
        .catch(() => {
          this.setState({ isLoading: false });
        });
    } else {
      this.setState({ isLoading: false });
      this.props.autoLoginFail();
    }
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/" component={BurgerBuilder} exact />
        <Route
          path="/menu"
          exact
          render={() => (
            <Suspense fallback={<Loader />}>
              <Menu />
            </Suspense>
          )}
        />
        <Route
          path="/user/:type"
          exact
          render={() => (
            <Suspense fallback={<Loader />}>
              <Auth />
            </Suspense>
          )}
        />
        <Route component={notFound} />
      </Switch>
    );
    if (this.props.authState) {
      routes = (
        <Switch>
          <Route path="/" component={BurgerBuilder} exact />
          <Route
            path="/menu"
            exact
            render={() => (
              <Suspense fallback={<Loader />}>
                <Menu />
              </Suspense>
            )}
          />
          <Route
            path="/orders"
            render={() => (
              <Suspense fallback={<Loader />}>
                <Orders />
              </Suspense>
            )}
            exact
          />
          <Route
            path="/checkout"
            render={() => (
              <Suspense fallback={<Loader />}>
                <Checkout />
              </Suspense>
            )}
            exact
          />
          <Route component={notFound} />
        </Switch>
      );
    }
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <Navbar auth={this.props.isAuthenticated} />
            {routes}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authState: state.auth.isAuthenticated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: (email, password) => {
      return dispatch(authenticate(false, email, password));
    },
    autoLoginFail: () => {
      //  remove the loading animation if autologin fails ....
      dispatch({ type: AUTHENTICATE, payload: {} });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
