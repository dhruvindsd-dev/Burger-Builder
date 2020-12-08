import "./App.css";
import "../node_modules/bulma/css/bulma.css";
import "../node_modules/animate.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import React, { Component, lazy, Suspense } from "react";
import BurgerBuilder from "./containers/burgerBuilder/BurgerBuilder";
import Navbar from "./components/Navbar/Navbar";
import { Route, Switch, withRouter } from "react-router";
import { connect } from "react-redux";

import { authenticate } from "./store/actions/auth";
import Loader from "./components/UI/Loader/Loader";
import { AUTHENTICATE } from "./store/actions/actions";
import Menu from "./containers/Menu/Menu";
const Checkout = lazy(() => import("./containers/Checkout/Checkout"));
const Auth = lazy(() => import("./containers/Auth/Auth"));
const Orders = lazy(() => import("./containers/Orders/Orders"));

class App extends Component {
  state = {
    isLoading: false,
  };
  componentDidMount() {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    console.log(email);
    if (email && password) {
      this.props
        .autoLogin(email, password, this.props.history.push)
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
    let routes;
    if (this.props.authState) {
      routes = (
        <React.Fragment>
          {/* <Route
            path="/orders"
            // render={() => (
            //   <Suspense fallback={<Loader />}>

            //   </Suspense>
            // )}
            component={Menu}
            exact
          /> */}
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
        </React.Fragment>
      );
    } else {
      routes = (
        <Route
          path="/user/:type"
          exact
          render={() => (
            <Suspense fallback={<Loader />}>
              <Auth />
            </Suspense>
          )}
        />
      );
    }
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <Navbar auth={this.props.isAuthenticated} />
            <Switch>
              <Route path="/" component={BurgerBuilder} exact />
              <Route path="/menu" component={Menu} />
              {/* <Route path="/orders" component={Orders} /> */}
              {routes}
              {/* <Route path="/404" exact component={notFound} /> */}
              {/* <Redirect to="/404" component={notFound} /> */}
            </Switch>
            {/* {props.isAuthenticated ? (

          ) : (
            <Route path="/user/:type" exact component={Auth} />
          )} */}
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
    autoLogin: (email, password, route) => {
      return dispatch(authenticate(false, email, password, route));
    },
    autoLoginFail: () => {
      // this is to remove the loading animation ....
      dispatch({ type: AUTHENTICATE, payload: {} });
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
