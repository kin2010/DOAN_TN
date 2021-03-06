import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./app/store";
import ShopContextProvider from "./Context/ShopContext";
import AuthContextProvider from "./Context/AuthContext";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import ProductContextProvider from "./Context/ProductContext";
import CategoryContextProvider from "./Context/CategoryContext";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
const root = ReactDOM.createRoot(document.getElementById("root"));
const history = createBrowserHistory();
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={history}>
        <AuthContextProvider>
          <CategoryContextProvider>
            <ProductContextProvider>
              <ShopContextProvider>
                <App />
              </ShopContextProvider>
            </ProductContextProvider>
          </CategoryContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
