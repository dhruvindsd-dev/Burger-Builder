import Axios from "axios";
import { AUTHENTICATE } from "./actions";

export const authenticate = (isSignUp, email, password, route) => {
  // 1.email , 2. password
  return (dispatch) => {
    // some async thing
    let url;
    if (isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDHx6tjGf3HFOpd9qdLJmLKwhReZBVaw30";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDHx6tjGf3HFOpd9qdLJmLKwhReZBVaw30";
    }
    console.log("async action working bitch ", email);
    return Axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true,
    })
      .then((response) => {
        // succeess
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        dispatch({
          type: AUTHENTICATE,
          payload: {
            token: response.data.idToken,
          },
        });
        // route("/");
        return response;
      })
      .catch((error) => {
        dispatch({
          type: AUTHENTICATE,
          payload: {},
        });
        throw error.response;
      });
  };
};
