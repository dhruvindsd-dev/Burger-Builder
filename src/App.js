import "./App.css";
import "../node_modules/bulma/css/bulma.css";
import "../node_modules/animate.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import React, { Component } from "react";
import BurgerBuilder from "./containers/burgerBuilder/BurgerBuilder";
import Navbar from "./components/Navbar/Navbar";
import Orders from "./containers/Orders/Orders";
import { Route } from "react-router";

class App extends Component {
  render() {
    return (
      <div className="">
        <Navbar />
        <div className="section">
          <Route path="/" component={BurgerBuilder} exact />
          <Route path="/Orders" component={Orders} exact />
        </div>
      </div>
    );
  }
}

export default App;
