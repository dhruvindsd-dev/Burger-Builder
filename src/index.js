import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// import reducer, { store } from "./store/reducers/reducer";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import burgerReducer from "./store/reducers/burger";
import authReducer from "./store/reducers/auth";
import cacheReducer from "./store/reducers/cache";
import thunk from "redux-thunk";
const rootreducer = combineReducers({
  burger: burgerReducer,
  auth: authReducer,
  cache: cacheReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootreducer,
  composeEnhancers(applyMiddleware(thunk))
);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
