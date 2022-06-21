import './App.css';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Shop from './components/Shop';
import Auth from './components/Auth/Auth';
import { createBrowserHistory } from 'history';
import SingleProduct from './Page/SingleProduct';
import Checkout from './Page/Checkout';
import ViewCart from './Page/ViewCart';
const customTheme = createTheme({
  colors: {
    main: '#ff536f',
    main2: '#c6596b',
    secondary: '#17a2b8',
    bg: '#eeeeee',
    bg2: '#f9f9f9',
    gray: '#7f868d',
    info: '#1976d2',
    success: '#28a745',
    gray2: '#e9eef5',
    graycheckout: '#4c4c4c',
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
            <Route exact path="/checkout" element={<Checkout />}></Route>
            <Route exact path="/viewcart" element={<ViewCart />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
