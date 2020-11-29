import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar is-light">
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            activeClassName="is-active"
            exact
            to="/"
            className="navbar-item"
          >
            <span className="icon is-large">
              <i className="fas fa-hamburger"></i>
            </span>
            <span>Burger Builder</span>
          </NavLink>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <NavLink
              activeClassName="is-active"
              to="/"
              exact
              className="navbar-item"
            >
              Home
            </NavLink>
            <NavLink
              activeClassName="is-active"
              to="/orders"
              exact
              className="navbar-item"
            >
              Orders
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
