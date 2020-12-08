import * as actionTypes from "../actions/actions";

const INGREDIENTPRICES = {
  meat: 0.5,
  salad: 0.2,
  cheese: 0.6,
  bacon: 0.4,
};

const initialState = {
  ingredients: {
    meat: 0,
    salad: 0,
    cheese: 0,
    bacon: 0,
  },
  totalPrice: 4,
  isPurchasable: false,
  didInitialLoad: false,
};

export default (state = initialState, { type, payload }) => {
  const updateIsPurchasable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((item) => {
        return ingredients[item];
      })
      .reduce((sum, next) => {
        return sum + next;
      }, 0);
    return sum > 0;
  };
  let updatedIngredients;
  switch (type) {
    case actionTypes.ADD_INGREDIENT:
      updatedIngredients = { ...state.ingredients };
      updatedIngredients[payload.type]++;
      return {
        ...state,
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTPRICES[payload.type],
        isPurchasable: updateIsPurchasable(updatedIngredients),
      };
    case actionTypes.REMOVE_INGREDIENT:
      updatedIngredients = { ...state.ingredients };
      if (updatedIngredients[payload.type] > 0) {
        updatedIngredients[payload.type]--;
        return {
          ...state,
          ingredients: updatedIngredients,
          totalPrice: state.totalPrice - INGREDIENTPRICES[payload.type],
          isPurchasable: updateIsPurchasable(updatedIngredients),
        };
      }
      break;
    case actionTypes.TOGGLE_INITIAL_BURGER_LOAD:
      return {
        ...state,
        didInitialLoad: true,
      };
    case actionTypes.RESET_BURGER:
      let updateIngredients = {};
      Object.keys(state.ingredients).map((item) => {
        updateIngredients[item] = 0;
      });
      console.log(updateIngredients);
      return {
        ...state,
        ingredients: updateIngredients,
      };
    default:
      return state;
  }
};
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const store = createStore(
//   reducer,
//   composeEnhancers(applyMiddleware(thunk))
// );

/**
1. getting the burger data from the server and adding a simp save to server button for practise
 - check if there is a premade thing in the server, if there then fetch else reset to zero

2. also store some premade recipes in the server which the user can select and load
  - check for the premade recipes in the server, if there then load else show in a sexi way and then when you click then reset the scrollin position to zero and load the ingredinets into the burger.
 */
