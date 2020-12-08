import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { LOGOUT } from "../../store/actions/actions";

const Navbar = (props) => {
  return (
    <nav className="navbar is-light">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item is-tab">
            <span className="icon is-large">
              <i className="fas fa-hamburger"></i>
            </span>
            <span>Burger Builder</span>
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <NavLink
              activeClassName="is-active"
              to="/menu"
              exact
              className="navbar-item is-tab"
            >
              Menu
            </NavLink>
            {props.auth ? (
              <React.Fragment>
                <NavLink
                  activeClassName="is-active"
                  to="/orders"
                  exact
                  className="navbar-item is-tab"
                >
                  Orders
                </NavLink>

                <Link
                  onClick={props.logout}
                  to="/"
                  className="navbar-item is-tab"
                >
                  Logout
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavLink
                  className="navbar-item is-tab"
                  activeClassName="is-active"
                  to="/user/signin"
                >
                  Signin
                </NavLink>
                <NavLink
                  className="navbar-item is-tab"
                  activeClassName="is-active"
                  to="/user/signup"
                >
                  SignUp
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth.isAuthenticated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch({
        type: LOGOUT,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
