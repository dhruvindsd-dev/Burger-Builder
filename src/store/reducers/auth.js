import * as actionTypes from "../actions/actions";

const initialState = {
  isAuthenticated: false,
  authToken: "",
  userId: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.AUTHENTICATE:
      if (payload.token) {
        return {
          ...state,
          isAuthenticated: true,
          authToken: payload.token,
          userId: payload.userId,
        };
      } else {
        // some error occured so just remove the loader
        return {
          ...state,
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
