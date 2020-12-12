import Axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "../../components/UI/Loader/Loader";
import * as actionTypes from "../../store/actions/actions";

class Menu extends Component {
  state = {
    isLoading: true,
    menu: null,
  };
  componentDidMount() {
    if (!this.props.menu) {
      Axios.get(
        "https://recipe-app-ab93d.firebaseio.com/details/Menu.json"
      ).then((response) => {
        // this.setState({
        //   menu: response.data,
        //   isLoading: false,
        // });
        this.props.cacheMenu(response.data);
        this.setState({
          menu: response.data,
          isLoading: false,
        });
      });
    } else {
      this.setState({
        menu: this.props.menu,
        isLoading: false,
      });
    }
  }
  onCreateBurger = (type) => {
    this.props.resetBurger();
    Object.keys(this.state.menu[type]).map((item) => {
      for (let i = 0; i < this.state.menu[type][item]; i++) {
        this.props.addIngredientHandler(item);
      }
    });
    this.props.history.push("/");
  };
  render() {
    let menu = <Loader />;
    if (!this.state.isLoading) {
      menu = Object.keys(this.state.menu).map((item, i) => (
        <div className="column is-4" key={i}>
          <div className="notification is-link is-light blue-hover">
            <p className="is-size-4 has-text-weight-semibold mb-2">{item}</p>
            <ul style={{ listStyle: "disc", listStylePosition: "inside" }}>
              {Object.keys(this.state.menu[item]).map((ingr, i) => (
                <li key={i}>
                  ''
                  {ingr} : {this.state.menu[item][ingr]}
                </li>
              ))}
            </ul>
            <button
              onClick={this.onCreateBurger.bind(this, item)}
              className="button is-outlined is-link mt-4"
            >
              Create Burger Now !!!
            </button>
          </div>
        </div>
      ));
    }
    return (
      <div className="section">
        <p className="title has-text-centered">Our Menu</p>
        <br />
        <br />
        <div className="container">
          <div className="columns is-multiline">{menu}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    menu: state.cache.menu,
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
    resetBurger: () => {
      dispatch({
        type: actionTypes.RESET_BURGER,
      });
    },
    cacheMenu: (menuData) => {
      dispatch({
        type: actionTypes.CACHE_MENU,
        payload: { menu: menuData },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
