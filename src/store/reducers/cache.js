import {
  CACHE,
  CACHE_INITIAL_BURGER,
  CACHE_MENU,
  CACHE_ORDERS,
} from "../actions/actions";

const initialState = {
  menu: null,
  orders: null,
  initialBurger: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CACHE_MENU:
      return { ...state, menu: payload.menu };
    case CACHE_ORDERS:
      return {
        ...state,
        orders: payload.orders,
      };
    case CACHE_INITIAL_BURGER: {
      return {
        ...state,
        initialBurger: payload.burger,
      };
    }
    default:
      return state;
  }
};
