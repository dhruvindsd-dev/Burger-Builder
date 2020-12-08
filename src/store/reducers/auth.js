import * as actionTypes from "../actions/actions";

const initialState = {
  isAuthenticated: false,
  authToken: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.AUTHENTICATE:
      if (payload.token) {
        return {
          ...state,
          isAuthenticated: true,
          authToken: payload.token,
          showAutoLoginLoader: false,
        };
      } else {
        // some error occured so just remove the loader
        return {
          ...state,
          showAutoLoginLoader: false,
        };
      }
    case actionTypes.LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        authToken: "",
      };
    default:
      return state;
  }
};
