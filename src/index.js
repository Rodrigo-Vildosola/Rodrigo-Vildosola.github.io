/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import App from "App";

import { Provider, connect } from "react-redux";

import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";

import { SoftUIControllerProvider } from "context";

import { rootReducer } from "redux/reducers/rootReducer";

import "./redux/actions/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const mapStateToProps = () => {
  return {
    isAuthenticated: !(
      localStorage.getItem("access-token") === "null" ||
      localStorage.getItem("access-token") === "undefined" ||
      localStorage.getItem("access-token") === null
    ),
  };
};

// Soft UI Context Provider

const Component = (props) => {
  return (
    <BrowserRouter>
      <SoftUIControllerProvider>
        <App />
      </SoftUIControllerProvider>
    </BrowserRouter>
  );
};
const Container = connect(mapStateToProps)(Component);

const Application = () => (
  <Provider store={store}>
    <Container />
  </Provider>
);
ReactDOM.render(Application(), document.getElementById("root"));
