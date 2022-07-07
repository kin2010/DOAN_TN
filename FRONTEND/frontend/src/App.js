import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Shop from "./components/Shop";
import Auth from "./components/Auth/Auth";
import { createBrowserHistory } from "history";
import SingleProduct from "./Page/SingleProduct";
import Checkout from "./Page/Checkout";
import ViewCart from "./Page/ViewCart";
import PrivateRoutes from "./Utils/PrivateRouter";
import Order from "./Page/Order";
import Admin from "./Admin/Admin";
import ProductAdmin from "./Admin/PageAdmin/Product";
import ChangeProduct from "./Admin/PageAdmin/ChangeProduct";
import CategoryAdmin from "./Admin/PageAdmin/CategoryAdmin";
import BillAdmin from "./Admin/PageAdmin/BillAdmin";
import User from "./Admin/PageAdmin/User";
// import "@coreui/coreui/dist/css/coreui.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";
const customTheme = createTheme({
  colors: {
    main: "#ff536f",
    main2: "#c6596b",
    secondary: "#17a2b8",
    bg: "#eeeeee",
    bg2: "#f9f9f9",
    gray: "#7f868d",
    info: "#1976d2",
    success: "#28a745",
    gray2: "#e9eef5",
    graycheckout: "#4c4c4c",
  },
});
function App() {
  const history = createBrowserHistory();
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <BrowserRouter history={history}>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route element={<PrivateRoutes />}>
              <Route exact path="/checkout" element={<Checkout />}></Route>
              <Route exact path="/viewcart" element={<ViewCart />}></Route>
              <Route exact path="/order/:id" element={<Order />}></Route>
              <Route path="/admin" element={<Admin />}>
                <Route exact path="product" element={<ProductAdmin />}></Route>
                <Route
                  exact
                  path="category"
                  element={<CategoryAdmin />}
                ></Route>
                <Route exact path="bill" element={<BillAdmin />}></Route>
                <Route
                  exact
                  path="product/:id"
                  element={<ChangeProduct />}
                ></Route>
                <Route exact path="user" element={<User />}></Route>
              </Route>
            </Route>
            <Route
              exact
              path="/login"
              element={<Auth auth="login"></Auth>}
            ></Route>
            <Route
              exact
              path="register"
              element={<Auth auth="register"></Auth>}
            ></Route>
            <Route exact path="/shop" element={<Shop />}></Route>
            <Route
              exact
              path="/product/:id"
              element={<SingleProduct />}
            ></Route>
            <Route exact path="/subcategory/:id" element={<Shop />}></Route>
            <Route exact path="/category/:id" element={<Shop />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
